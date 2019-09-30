import React, { Component } from 'react';
import Article from "../Article/Article";
import { Link, Switch, Route } from "react-router-dom";
import config from "../../config"
import { getAuthToken } from "../../auth/token-service"
import WriteArticlePage from "../WriteArticle/Write-Article-Page"
import PrivateRoute from '../../utils/PrivateRoute'
import './Main-Page.css'


class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
          articles: [],
        }
    }

    componentDidMount() {
        let articlesURL = config.API_ENDPOINT + `api/articles`
        let commentsURL = config.API_ENDPOINT + `api/comments`
        Promise.all([
          fetch(articlesURL, {
            headers: {
              'authorization': `Bearer ${getAuthToken()}`
            }
          }),
          fetch(commentsURL, {
            headers: {
              'authorization': `Bearer ${getAuthToken()}`
            }
          })
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
          // for each comment search the article array and find the matching id, then insert the comment into the article.comments, then remake the array and set the state with the new array
          comments.forEach((comment) => {
            let tempArticle = articles.find((article) => comment.article_id === article.id
            )
            const newCommentsArray = tempArticle.comments ? [...tempArticle.comments, comment] : [comment]
            articles.forEach((article) => {
              if (article.id === comment.article_id) {
                return article.comments = newCommentsArray
              }
              return
            }) 
          })
          this.setState({articles: articles})
        })
        .catch(error => {
          alert(error.message)
        })    
    }

    handleSubmitWriteForm = (article) => {
        let articlesURL = config.API_ENDPOINT + `api/articles`
        article.created = new Date()

        fetch(articlesURL, {
            method: 'POST',
            headers: {
            'content-type': "application/json",
            'authorization': `Bearer ${getAuthToken()}`
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

    handleSubmitCommentsForm = (article_id, comment) => {
        // console.log(comment)
        let commentsURL = config.API_ENDPOINT + `api/comments`
        fetch(commentsURL,
            {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify({ comment, article_id })
            })
            .then(response => {
            if (!response.ok) {
                return response.json().then(responseJson => Promise.reject(responseJson))
            }
            return response.json()
            })
            .then(resComment => {
            let comment = { comment: resComment.comment, username: resComment.username }
            let newArticlesArray = this.state.articles
            let articleToUpdateIndex = newArticlesArray.findIndex(article => article.id === article_id)
            const newCommentsArray = newArticlesArray[articleToUpdateIndex].comments ? newArticlesArray[articleToUpdateIndex].comments : []
            const updatedCommentsArray = [...newCommentsArray, comment]
            newArticlesArray[articleToUpdateIndex].comments = updatedCommentsArray 
            this.setState({
                articles: newArticlesArray
            })
        })
    }

    render() {
        return (
            <Switch>
                <Route 
                    exact path='/main-page'
                    render={() => <section className='Main-page'>
                    <div className='toolbar'>
                        <Link to="/main-page/write-article-page" >Write Article</Link>
                        {/* <Link to="" >Filter</Link> */}
                        <Link to="" >Sort</Link>
                    </div>
                    <div className='Main-container'>
                        <Article onCommentSubmit={this.handleSubmitCommentsForm} articles={this.state.articles}/>
                    </div>
                </section>} />
                <PrivateRoute 
                    path='/main-page/write-article-page' component={(props) => <WriteArticlePage {... props} onWriteSubmit={this.handleSubmitWriteForm} /> }
                />
            </Switch>
        )
    }
}

export default MainPage