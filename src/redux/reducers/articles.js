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
            let article = Object.assign({}, state.article);
            article.claps++;
            console.log(article);
            return {
                ...state,
                article: article
            }
        case constants.THROW_TOMATO:
            article = Object.assign({}, state.article);
            article.tomatos++;
            return {
                ...state,
                article: article
            }
        default:
            return state;
    }
}