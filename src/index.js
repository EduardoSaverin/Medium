import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { Switch, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { store, history } from './redux/store';
import { getUser } from './redux/actions/actions';
import { ConnectedRouter } from 'react-router-redux';
import ErrorBoundary from './components/ErrorBoundary';
import './assets/medium.css';

if (localStorage.Auth) {
    // Read localstorage
    store.dispatch({ type: 'SET_USER', user: JSON.parse(localStorage.Auth) });
    console.log(localStorage.Auth);
    var _id = JSON.parse(localStorage.Auth)._id;
    getUser(_id).then((res) => {
        store.dispatch({ type: 'SET_USER', user: res });
    });
}


ReactDOM.render(
    <ErrorBoundary>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/" component={App} />
                </Switch>
            </ConnectedRouter>
        </Provider>
    </ErrorBoundary>,
    document.getElementById('root')
);
registerServiceWorker();
