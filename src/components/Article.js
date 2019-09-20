import React from 'react'
import Comments from "./Comments"

export default function Article(props) {
    const articles = props.articles.map((article, i) => {
        return (<div className='Article' key={i}>
            <div className='Article-container'>
                <div className='Article-headline'>
                    {article.headline}
                </div>
                <div> 
                    {article.content}
                </div>
            </div>
            <div className='Comments-section'>
                <Comments key={i} comments={article.comments} />
            </div>
        </div>)
    }) 
    return (
        <React.Fragment>
            {articles}
        </React.Fragment>
    )
}