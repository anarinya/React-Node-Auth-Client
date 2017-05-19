import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';
import { App, SignIn, SignOut, SignUp, Home, Feature, RequireAuth } from './components';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import reducers from './reducers';
import '../styles/index.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <App>
        <Switch>
          <Route path="/feature" component={RequireAuth(Feature)} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signout" component={SignOut} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" component={Home} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
