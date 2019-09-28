import React, { Component } from 'react'
import Comments from "./Comments"
import "./Article.css";

export default class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentsForArticle: []
        }
    }
    static defaultProps = {
        articles: []
    }

    handleInputChange = (event) => {
        const target = event.target
        const value = target.value 
        const name = target.name
        const newCommentsArray = [...this.state.commentsForArticle]
        newCommentsArray[name] = value
        this.setState({
            commentsForArticle: newCommentsArray
        })

    }

    handleCommentSubmit = (event) => {
        event.preventDefault()
        const target = event.target
        const name = target.name
        const id = target.id
        console.log(name)
        console.log(id)
        const newComment = this.state.commentsForArticle[name]
        console.log(newComment)       
        this.props.onCommentSubmit(id, newComment)
        this.resetForm(id)
    }

    resetForm = (id) => {
        document.getElementById(id).querySelector('form').reset()

    }

    render() {
        const articles = this.props.articles.map((article, i) => {
            return (<div className='Article' id={article.id} key={i}>
                <div className='Article-container'>
                    <div className='Article-headline'>
                        {article.headline}
                    </div>
                    <div className='Article-print'> 
                        {article.print}
                    </div>
                    <div className="Article-username">
                        {article.username}
                    </div>
                </div>
                <div className='Comments-section'>
                    <Comments key={i} comments={article.comments || []} />
                </div>
                <form className='Comments-input-section' onSubmit={this.handleCommentSubmit} name={i} id={article.id} >
                    <input 
                        type="text" 
                        placeholder='Write a comment' 
                        name={i} 
                        value={this.state.commentsForArticle.i} 
                        onChange={this.handleInputChange} 
                    />
                </form>
            </div>)
        }) 
        return (
            <React.Fragment>
                {articles}
            </React.Fragment>
        )
    }
}


