import React, { Component } from 'react'
import { Switch } from "react-router"
import { withRouter, Route } from "react-router-dom"
import './App.css';
import PrivateRoute from './utils/PrivateRoute'
import LandingPage from "./components/LandingPage/Landing-Page"
import AccountSignupPage from "./components/AccountSignupPage/Account-Signup-Page"
import LoginPage from "./components/LoginPage/Login-Page"
import MainPage from "./components/MainPage/Main-Page"
import Header from "./components/Header/Header";
import './components/Header/Header.css'


class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <Switch>
            <LandingPage
              exact path='/' 
            />
            <Route 
              path='/account-signup-page' 
              render={({history}) => <AccountSignupPage history={history} /> }
            />
            <Route 
              path='/login-page' 
              render={({history}) => <LoginPage history={history} /> }
            />
            <PrivateRoute 
              component={(props) => <MainPage {...props} /> } 
              path='/main-page' 
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App)
