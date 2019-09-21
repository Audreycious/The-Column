import React from 'react';
import Article from "./Article";
import { Link } from "react-router-dom";

export default function MainPage(props) {
    return (
        <section className='Main-page'>
            <div className='Main-page-toolbar'>
                <Link to="/write-article-page">Write Article</Link>
                <button>Filter</button>
                <button>Sort</button>
            </div>
            <div className='Main-container'>
                <Article onCommentSubmit={props.onCommentSubmit} articles={props.articles}/>
            </div>
        </section>
    )
}