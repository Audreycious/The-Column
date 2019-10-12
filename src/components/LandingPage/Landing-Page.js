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
                <p>
                    This is an app that does stuff AND THINGS
                </p>
            </div>
        </section>
    )
}
