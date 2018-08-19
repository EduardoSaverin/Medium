const articlecontroller = require('./../controllers/article.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {

    /**
     * Get all articles
     */
    router
        .route('/articles')
        .get(articlecontroller.getAll)

    /**
     * Add an article
     */
    router
        .route('/article')
        .post(multipartWare, articlecontroller.addArticle)

    /**
     * Clap on an article
     */
    router
        .route('/article/clap')
        .post(articlecontroller.clapArticle)

    /**
     * Throw Tomato on an article
     */
    router
        .route('/article/throwTomato')
        .post(articlecontroller.throwTomato)

    /**
     * Comment on an article
     */
    router
        .route('/article/comment')
        .post(articlecontroller.commentArticle)

    /**
     * Get a particlular article to view
     */
    router
        .route('/article/:id')
        .get(articlecontroller.getArticle)
}