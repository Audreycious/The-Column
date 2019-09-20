import React from 'react';
import { Link } from "react-router-dom";

export default function() {
    return (
        <section className="Landing-page">
            <div className='Sidebar-link-container'>
                <Link to="/login-page">Login</Link>
                <Link to="/account-signup-page">Signup</Link>
            </div>
            <div className="Description-container">
                <p>
                    This is an app that does stuff AND THINGS
                </p>
            </div>
        </section>
    )
}
