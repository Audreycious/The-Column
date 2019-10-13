import React, { Component } from 'react'
import './Write-Article-Page.css'


export default class WriteArticlePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
          headline: [],
          print: [],
        }
    }   

    handleInputChange = (event) => {
        const target = event.target
        const value = target.value 
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    handleWriteSubmit = (event) => {
        event.preventDefault()
        if (this.props.articlesLeft === 0) {
            return alert(`You have no articles remaining`)
        }
        let articleInfo = this.state
        this.props.onWriteSubmit(articleInfo)
    }

    render() { 
        return (
            <section className='Write-article-page'>
                <div className="toolbar">
                    <p className='articles-left-text' >Articles remaining:&nbsp;</p>
                    {this.props.articlesLeft === 0 ? <img alt="A large zero" className="giant-zero-image" src="https://myrealdomain.com/images/0-png-7.png"></img> : <p className={`articles-left-number ` + (this.props.articlesLeft >= 3 ? 'green' : '') +(this.props.articlesLeft === 2 ? 'yellow' : '') +(this.props.articlesLeft <= 1 ? 'red' : '') + ``}>{this.props.articlesLeft}</p>}
                </div>
                <div className='Main-container Write-article-container'>
                    <form action="#" className="Article-form" onSubmit={this.handleWriteSubmit}>
                    <fieldset>
                        <legend>Submit an Article<br/>to The Column</legend>
                        <label htmlFor="headline">Headline:</label>
                        <input type="text" name="headline" required className="Article-headline-input" value={this.state.headline} onChange={this.handleInputChange} placeholder="Enter your headline" />
                        <label htmlFor="print">Print:</label>
                        <textarea name="print" required className="Article-print-input" value={this.state.print} onChange={this.handleInputChange} placeholder="Enter your content here" />
                    </fieldset>
                    <button type="submit">Hand it in to the Editor</button>
                    </form>
                </div>
            </section>
        )
    }
}