import React, { Component } from 'react'
import { Switch } from "react-router"
import { withRouter } from "react-router-dom"
import './App.css';
import LandingPage from "./components/Landing-Page"
import AccountSignupPage from "./components/Account-Signup-Page"
import LoginPage from "./components/Login-Page"
import MainPage from "./components/Main-Page"
import WriteArticlePage from "./components/Write-Article-Page"

const articles = [{headline: 'Headline 1', content: 'Content 1', comments: ['Comment 1', 'Comment 2', 'Comment 3', 'Comment 4', 'Comment 5', 'Comment 6', 'Comment 7', 'Comment 8', 'Comment 9', 'Comment 10', ]}, {headline: 'Headline 2', content: 'Content 2', comments: ['Comment 1', 'Comment 2', 'Comment 3', 'Comment 4', 'Comment 5', 'Comment 6', 'Comment 7', 'Comment 8', 'Comment 9', 'Comment 10' ]}]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      users: [],
    }
  }

  componentDidMount() {
    this.setState({articles})
  }

  handleSubmitSignupForm = (user) => {
    console.log(user)
    this.setState({
      users: [
        ...this.state.users,
        user
      ]
    })
    console.log(this.state.users)
    this.props.history.push('/main-page')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          The Column
        </header>
        <main>
          <Switch>
            <LandingPage exact path='/' />
            <AccountSignupPage path='/account-signup-page' onSignupSubmit={this.handleSubmitSignupForm} />
            <LoginPage path='/login-page' />
            <MainPage articles={articles} path='/main-page' />
            <WriteArticlePage path='/write-article-page' />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App)
