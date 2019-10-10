import React, { Component } from 'react';
import Article from "../Article/Article";
import { Link, Switch, Route } from "react-router-dom";
import WriteArticlePage from "../WriteArticle/Write-Article-Page"
import PrivateRoute from '../../utils/PrivateRoute'
import './Main-Page.css'


class MainPage extends Component {

    // componentDidMount() {
    //     this.props.fetchArticles()
    // }

    render() {
        return (
            <Switch>
                <Route 
                    exact path='/main-page'
                    render={() => <section className='Main-page'>
                    <div className='toolbar'>
                        <Link to="/main-page/write-article-page" >Write Article</Link>
                        {/* <Link to="" >Filter</Link> */}
                        Sort: <button className="sort-created" onClick={this.sortArticlesByCreated} >Created</button>
                        <button className="sort-popular" onClick={this.sortArticlesByPopular}>Popular</button>
                    </div>
                    <div className='Main-container'>
                        <Article onCommentSubmit={this.props.onCommentSubmit} articles={this.props.articles}/>
                    </div>
                </section>} />
                <PrivateRoute 
                    path='/main-page/write-article-page' component={(props) => <WriteArticlePage {...props} articlesLeft={this.props.articlesLeft} onWriteSubmit={(articleInfo) => this.props.onWriteSubmit(articleInfo)} /> }
                />
            </Switch>
        )
    }
}

export default MainPage