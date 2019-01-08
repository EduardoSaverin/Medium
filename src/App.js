import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Feed from './components/Feed';
import Profile from './components/Profile';
import ArticleView from './components/ArticleView';
import Editor from './components/Editor';
import SignInWith from './components/SignInWith';
import Authenticate from './utils/requireAuth';

class App extends Component {
  render() {
    const pathname = window.location.pathname;
    return (
      <div>
        {!pathname.includes('editor') ? <Header /> : null}
        <SignInWith />
        <Switch>
          <Route exact path="/" component={Feed} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/articleview/:id" component={ArticleView} />
          <Route path="/editor" component={Authenticate(Editor)} />
          <Route path="**" component={Feed} />
        </Switch>
      </div>
    );
  }
}

export default App;
