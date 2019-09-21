import React, { Component } from 'react'
import { Switch } from "react-router"
import { withRouter } from "react-router-dom"
import './App.css';
import LandingPage from "./components/Landing-Page"
import AccountSignupPage from "./components/Account-Signup-Page"
import LoginPage from "./components/Login-Page"
import MainPage from "./components/Main-Page"
import WriteArticlePage from "./components/Write-Article-Page"

const articles = [{headline: 'Headline 1', print: 'Print 1', comments: ['Comment 1', 'Comment 2', 'Comment 3', 'Comment 4', 'Comment 5']}, {headline: 'Headline 2', print: 'Print 2', comments: ['Comment 1', 'Comment 2', 'Comment 3', 'Comment 4', 'Comment 5']}, {headline: 'Headline 3', print: 'Print 3', comments: ['Comment 1', 'Comment 2', 'Comment 3', 'Comment 4', 'Comment 5']}, {headline: 'Headline 4', print: 'Print 4', comments: ['Comment 1', 'Comment 2', 'Comment 3', 'Comment 4', 'Comment 5']}, {headline: 'Headline 5', print: 'Print 5', comments: ['Comment 1', 'Comment 2', 'Comment 3', 'Comment 4', 'Comment 5']}]
const users = [{name: 'Audrey', email: 'Porcupine4@gmail.com', username: 'Audrey', password: 'Audrey'}]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      users: [],
    }
  }

  componentDidMount() {
    this.setState({articles, users})
  }

  handleSubmitSignupForm = (user) => {
    console.log(user)
    this.setState({
      users: [
        ...this.state.users,
        user
      ]
    })
    // console.log(this.state.users)
    this.props.history.push('/main-page')
  }

  handleSubmitLoginForm = (loginInfo) => {
    // console.log(loginInfo)
    let usersArr = this.state.users
    let findUser = usersArr.find((user, i) => {
      return user.username.toLowerCase() === loginInfo.username.toLowerCase()
    })
    // console.log(findUser)
    
    if (!findUser) {
      return console.log(`Error: User not found`)
    }
    else if (findUser.password.toLowerCase() !== loginInfo.password.toLowerCase()) {
      return console.log(`Error: Password is incorrect`)
    }
    else {
      this.props.history.push('/main-page')
    }
  }

  handleSubmitCommentsForm = (name, newComment) => {
    console.log(newComment)
    const newArticlesArray = [...this.state.articles]
    const updatedCommentsArray = [...newArticlesArray[name].comments, newComment]
    newArticlesArray[name].comments = updatedCommentsArray 
    this.setState({
      articles: newArticlesArray
    })
  }

  handleSubmitWriteForm = (article) => {
    console.log(article)
    const newArticlesArray = [...this.state.articles]
    const updatedArticlesArray = [article, ...newArticlesArray]
    console.log(updatedArticlesArray);
    
    this.setState({
      articles: updatedArticlesArray
    }, () => this.props.history.push('/main-page'))
    console.log(this.state.articles)
    
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
            <LoginPage path='/login-page' onLoginSubmit={this.handleSubmitLoginForm} />
            <MainPage onCommentSubmit={this.handleSubmitCommentsForm} articles={this.state.articles} path='/main-page' />
            <WriteArticlePage path='/write-article-page' onWriteSubmit={this.handleSubmitWriteForm} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App)
