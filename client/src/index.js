import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import { Provider } from 'react-redux'
import configureStore from './store'
import * as serviceWorker from './serviceWorker';
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
const routing = (
  <Router>
    <Provider store={configureStore()}>
      <div>
        <Route exact path="/measures" component={App} />
        <Route exact path="/" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        {/* <Route exact path="/admin" component={Admin} /> */}
      </div>
    </Provider>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
