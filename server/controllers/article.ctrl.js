const Article = require('../models/Article');
const User = require('../models/User');
const fs = require('fs');
const cloudinary = require('cloudinary');

module.exports = {
    addArticle: (req, res, next) => {
        let { text, title, claps, description } = req.body;
        if (req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, (result) => {
                // Save Image to Cloudinary and get Url.
                let obj = { text, title, claps, description, feature_img: result.url != null ? result.url : '' };
                saveArticle(obj);
            }, {
                    resource_type: 'image',
                    eager: [
                        { effect: 'sepia' }
                    ]
                });
        } else {
            saveArticle({ text, title, claps, description, feature_img: '' });
        }
        function saveArticle(obj) {
            new Article(obj).save((err, article) => {
                if (err)
                    res.status(500).send(err);
                else if (!article)
                    res.sendSend(400);
                else {
                    return article.addAuthor(req.body.author_id).then((_article) => {
                        return res.status(200).send(_article);
                    });
                }
                next();
            })
        }
    },
    getAll: (req, res, next) => {
        Article.find(req.params.id)
            .populate('author')
            .populate('comments.author').sort({ 'date': -1 }).exec((err, article) => {
                if (err)
                    res.status(500).send(err);
                else if (!article)
                    res.sendStatus(404);
                else
                    res.status(200).send(article);
                next();
            })
    },
    clapArticle: (req, res, next) => {
        Article.findById(req.body.article_id).then((article) => {
            if (article == null) return res.json({ status: false });
            return article.clap().then(() => {
                return res.json({ status: true })
            })
        }).catch(next)
    },
    commentArticle: (req, res, next) => {
        console.log('ID', req.body);
        Article.findById(req.body.article_id).then((article) => {
            if (article == null) return res.json({ status: false });
            return article.comment({
                author: req.body.author_id,
                text: req.body.comment
            }).then(() => {
                return res.json({ status: true });
            })
        }).catch(next)
    },
    getArticle: (req, res, next) => {
        Article.findById(req.params.id)
            .populate('author')
            .populate('comments.author').exec((err, article) => {
                if (err)
                    res.status(500).send(err);
                else if (!article)
                    res.sendStatus(404);
                else
                    res.status(200).send(article);
                next()
            })
    },
    throwTomato: (req, res, next) => {
        Article.findById(req.body.article_id).then(article => {
            if (article == null) return res.json({ status: false });
            return article.throwTomato().then(() => {
                return res.json({ status: true });
            });
        }).catch(next)
    }
}