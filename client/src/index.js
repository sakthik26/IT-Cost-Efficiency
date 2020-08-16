import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App';
import { Provider } from 'react-redux'
import configureStore from './store'

import * as serviceWorker from './serviceWorker';
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Settings from './pages/Settings'
import MeasureDetails from './pages/MeasureDetails'
import Dashboard from './pages/Dashboard'
import LandingPage from './pages/LandingPage'
import Measures from './pages/Measures'
import Navbar from './components/Navbar'
import ClientList from './pages/ClientList'
import Admin from './pages/Admin'

const routing = (
  <Router>
    <Provider store={configureStore()}>
      <div>

        <Navbar />
        <Switch>
          <Route path="/measures" component={Measures} />
          <Route path="/signin" component={SignIn} />
          <Route path="/settings" component={Settings} />
          <Route path="/measuredetails/:id" component={MeasureDetails} />
          <Route path="/measuredetails" component={MeasureDetails} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/landing" component={LandingPage} />
          <Route path="/clientlist" component={ClientList} />
          <Route path="/admin" component={Admin} />

          <Route exact path="/" component={SignUp} />
        </Switch>

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
