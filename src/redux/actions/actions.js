import axios from 'axios';
import * as constants from '../reducers/common';

export const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export function loadArticles() {
    return dispatch => {
        api.get('/articles')
            .then((res) => {
                console.log('Getting articles ', res);
                let articles = res.data;
                dispatch({ type: constants.LOAD_ARTICLE, articles });
            }).catch((err) => {
                console.log(err);
            })
    }
}

// This is called from index.js to get User Info.
export function getUser(_id) {
    return api.get(`/user/${_id}`).then((res) => {
        return res.data;
    }).catch(err => console.log(err));
}

export function getUserProfile(_id) {
    return (dispatch) => {
        api.get(`/user/profile/${_id}`).then((res) => {
            let profile = res.data;
            dispatch({ type: constants.SET_PROFILE, profile });
        }).catch(err => console.log(err));
    }
}

export function getArticle(article_id) {
    return dispatch => {
        api.get(`/article/${article_id}`)
            .then((res) => {
                let article = res.data;
                dispatch({ type: constants.VIEW_ARTICLE, article });
            }).catch((err) => console.log(err));
    }
}

export function comment() {
    return (dispatch) => {

    }
}

export function clap(article_id) {
    return dispatch => {
        api.post(`/article/clap`, { article_id }).then((res) => {
            if (res.data.status)
                dispatch({ type: constants.CLAP_ARTICLE, article_id });
        }).catch((err) => console.log(err));
    }
}

export function follow(id, user_id) {
    return dispatch => {
        api.post(`/user/follow`, { id, user_id }).then((res) => {
            dispatch({ type: constants.FOLLOW_USER, user_id });
        }).catch((err) => console.log(err));
    }
}

export function SignInUser(user_data) {
    return dispatch => {
        api.post(`/user`, user_data).then((res) => {
            let user = res.data;
            localStorage.setItem('Auth', JSON.stringify(user));
            dispatch({ type: constants.SET_USER, user });
        }).catch((err) => console.log(err));
    }
}

export function toggleClose() {
    return dispatch => {
        dispatch({ type: 'TOGGLE_MODAL', modalMode: false });
    }
}
export function toggleOpen() {
    return dispatch => {
        dispatch({ type: 'TOGGLE_MODAL', modalMode: true });
    }
}