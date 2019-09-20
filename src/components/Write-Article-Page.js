import React from 'react';

export default function LandingPage() {
    return (
        <section className='Write-article-page'>
            <div className='Main-container'>
                <form action="#" className="Article-form">
                <fieldset>
                    <legend>Submit an Article<br/>to The Column</legend>
                    <label htmlFor="headline">Headline:</label>
                    <input type="text" name="headline" />
                    <label htmlFor="print">Print:</label>
                    <input type="text" name="print" className="print-input" />
                </fieldset>
                <button type="submit">Hand it in to the Editor</button>
                </form>
            </div>
        </section>
    )
};