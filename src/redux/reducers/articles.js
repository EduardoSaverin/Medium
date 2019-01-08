import * as constants from './common';

const initialState = {
    articles: [],
    article: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case constants.LOAD_ARTICLE:
            return {
                ...state,
                articles: action.articles
            }
        case constants.VIEW_ARTICLE:
            return {
                ...state,
                article: action.article
            }
        case constants.CLAP_ARTICLE:
            let articleCopy = state.articles.slice(0);
            let index = articleCopy.forEach((item, index) => {
                if (item._id === action.article_id) {
                    return item;
                }
            })
            articleCopy[index].claps++;
            return {
                ...state,
                articles: articleCopy
            }
        case constants.THROW_TOMATO:
            let article = Object.assign({}, state.article);
            article.tomatos++;
            return {
                ...state,
                article: article
            }
        default:
            return state;
    }
}