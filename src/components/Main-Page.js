import React from 'react';
import Article from "./Article";

export default function MainPage(props) {
    return (
        <section className='Main-page'>
            <div className='Main-page-toolbar'>
                <button>Write Article</button>
                <button>Filter</button>
                <button>Sort</button>
            </div>
            <div className='Main-container'>
                <Article articles={props.articles}/>
            </div>
        </section>
    )
}