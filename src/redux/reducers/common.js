// Article Constants
export const LOAD_ARTICLE = 'LOAD_ARTICLES';
export const VIEW_ARTICLE = 'VIEW_ARTICLE';
export const CLAP_ARTICLE = 'CLAP_ARTICLE';
export const THROW_TOMATO = 'THROW_TOMATO';


// User Constants
export const SET_USER = 'SET_USER';
export const SET_PROFILE = 'SET_PROFILE';
export const FOLLOW_USER = 'FOLLOW_USER';


const defaultState = {
    appName: '',
    modalMode: false
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return {
                ...defaultState,
                modalMode: action.modalMode
            }
        default:
            return state;
    }
};