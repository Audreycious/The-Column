import React from 'react';
import { Link } from "react-router-dom";
import './Landing-Page.css'

export default function() {
    return (
        <section className="Landing-page">
            <div className='toolbar'>
                <Link to="/login-page" className='login-button'>Login</Link>
                <Link to="/account-signup-page" className='signup-button'>Signup</Link>
            </div>
            <div className="Description-container">
                <div className="outer-description-text">
                    Welcome to The Column!<br/>
                    -The social networking app with global posting<br/>
                    <br/>
                    <br/>
                    <p className="inner-description-text">
                        Create your account and login to view the latest articles written<br/>
                        <br/>
                        Sort The Column by Popular to see the articles with today's top activity<br/>
                        <br/>
                        Add your op-ed to an article in the section below it<br/>
                        <br/>
                        Write your own article, but be careful!<br/>
                        <br/>
                        The Column only allows you to write 3 new articles a year<br/>
                        <br/>
                        <br/>
                    </p>
                    Happy reporting, Columnists!
                </div>
            </div>
        </section>
    )
}
