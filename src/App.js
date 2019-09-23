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
    let usersURL = config.API_ENDPOINT + `api/users`
    fetch(usersURL,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(responseJson => Promise.reject(responseJson))
        }
        return response.json()
      })
      .then(resUser => {
        console.log(resUser)
        // TODO: Store the user login in the session
        this.props.history.push('/main-page')
      })
      .catch(error => {
        alert(error.error)
      })
  }

  handleSubmitLoginForm = (loginInfo) => {
    console.log(loginInfo)
    let loginURL = config.API_ENDPOINT + `api/login`
    fetch(loginURL,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(responseJson => Promise.reject(responseJson))
        }
        return response.json()
      })
      .then(response => {
        console.log(response)
        // TODO: Store the user login in the session
        this.props.history.push('/main-page')
      })
      .catch(error => {
        alert(error.error)
      })
    // let usersArr = this.state.users
    // let findUser = usersArr.find((user, i) => {
    //   return user.username.toLowerCase() === loginInfo.username.toLowerCase()
    // })
    // console.log(findUser)
    
    // if (!findUser) {
    //   return console.log(`Error: User not found`)
    // }
    // else if (findUser.password.toLowerCase() !== loginInfo.password.toLowerCase()) {
    //   return console.log(`Error: Password is incorrect`)
    // }
    // else {
    //   this.props.history.push('/main-page')
    // }
  }

  handleSubmitCommentsForm = (article_id, comment) => {
    // console.log(comment)
    let commentsURL = config.API_ENDPOINT + `api/comments`
    let user_id = '1'
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
        // console.log(resComment)
        
        let newArticlesArray = [...this.state.articles]
        let articleToUpdate = newArticlesArray.find(article => article.id === article_id)
        const newCommentsArray = articleToUpdate.comments ? articleToUpdate.comments : []
        const updatedCommentsArray = [...newCommentsArray, resComment.comment]
        articleToUpdate.comments = updatedCommentsArray 
        newArticlesArray = [...newArticlesArray, articleToUpdate]
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
