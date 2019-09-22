import React, { Component } from 'react'
import { Switch } from "react-router"
import { withRouter } from "react-router-dom"
import './App.css';
import LandingPage from "./components/Landing-Page"
import AccountSignupPage from "./components/Account-Signup-Page"
import LoginPage from "./components/Login-Page"
import MainPage from "./components/Main-Page"
import WriteArticlePage from "./components/Write-Article-Page"
import config from "./config"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      comments: []
    }
  }

  componentDidMount() {
    let articlesURL = config.API_ENDPOINT + `api/articles`
    let commentsURL = config.API_ENDPOINT + `api/comments`
    Promise.all([
      fetch(articlesURL),
      fetch(commentsURL)
    ])
    .then(([articlesRes, commentsRes]) => {
      if (!articlesRes.ok) {
        articlesRes.json()
        .then(articlesJson => Promise.reject(articlesJson))
      }
      if (!commentsRes.ok) {
        commentsRes.json()
        .then(commentsJson => Promise.reject(commentsJson))
      }
      return Promise.all([
        articlesRes.json(),
        commentsRes.json()
      ])
    })
    .then(([articles, comments]) => {
      const newArticlesArray = [...articles]
      // for each comment search the article array and find the matching id, then insert the comment into the article.comments, then remake the array and set the state with the new array
      comments.forEach((comment) => {
        let tempArticle = newArticlesArray.find((article) => comment.article_id === article.id
        )
        const newCommentsArray = tempArticle.comments ? [...tempArticle.comments, comment.comment] : [comment.comment]
        newArticlesArray.forEach((article) => {
          if (article.id === comment.article_id) {
            return article.comments = newCommentsArray
          }
          return
        }) 
      })
      this.setState({articles: newArticlesArray})
    })
    .catch(error => {
      alert(error.message)
    })    
  }

  handleSubmitSignupForm = (user) => {
    console.log(user)
    // this.setState({
    //   users: [
    //     ...this.state.users,
    //     user
    //   ]
    // })
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

  handleSubmitCommentsForm = (name, comment) => {
    console.log(comment)
    let commentsURL = config.API_ENDPOINT + `api/comments`
    let user_id = '1'
    let article_id = parseInt(name) + 1
    console.log(article_id)
    
    fetch(commentsURL,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ comment, article_id, user_id })
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(responseJson => Promise.reject(responseJson))
        }
        return response.json()
      })
      .then(resComment => {
        console.log(resComment)
        
        const newArticlesArray = [...this.state.articles]
        const newCommentsArray = newArticlesArray[name].comments ? newArticlesArray[name].comments : []
        const updatedCommentsArray = [...newCommentsArray, resComment.comment]
        newArticlesArray[name].comments = updatedCommentsArray 
        this.setState({
          articles: newArticlesArray
        })
      })
    
  }

  handleSubmitWriteForm = (article) => {
    let articlesURL = config.API_ENDPOINT + `api/articles`

    // TODO: implement user_id addition when user accounts live
    const tempUserID = '1'
    article.user_id = tempUserID
    article.created = new Date()
    fetch(articlesURL, {
      method: 'POST',
      headers: {
        'content-type': "application/json",
      },
      body: JSON.stringify(article)
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(responseJson => Promise.reject(responseJson))
      }
      return response.json()
    })
    .then(article => {
      console.log(article)
      const newArticlesArray = [...this.state.articles]
      const updatedArticlesArray = [article, ...newArticlesArray]
      console.log(updatedArticlesArray)
      this.setState({
        articles: updatedArticlesArray
      }, () => this.props.history.push('/main-page'))
      console.log(this.state.articles)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="https://the-column-app.now.sh/main-page"><h1>The Column</h1></a>
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
