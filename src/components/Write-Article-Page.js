import React, { Component } from 'react'
import './Write-Article-Page.css'


export default class WriteArticlePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
          headline: [],
          print: []
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
        let articleInfo = this.state
        this.props.onWriteSubmit(articleInfo)
    }

    render() { 
        return (
            <section className='Write-article-page'>
                <div className='Main-container'>
                    <form action="#" className="Article-form" onSubmit={this.handleWriteSubmit}>
                    <fieldset>
                        <legend>Submit an Article<br/>to The Column</legend>
                        <label htmlFor="headline">Headline:</label>
                        <input type="text" name="headline" className="Article-headline-input" value={this.state.headline} onChange={this.handleInputChange} placeholder="Enter your headline" />
                        <label htmlFor="print">Print:</label>
                        <input type="text" name="print" required className="Article-print-input" value={this.state.print} onChange={this.handleInputChange} placeholder="Enter your content here" />
                    </fieldset>
                    <button type="submit">Hand it in to the Editor</button>
                    </form>
                </div>
            </section>
        )
    }
}