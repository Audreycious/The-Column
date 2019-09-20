import React from 'react';

export default function() {
    return (
        <section className='Login-page'>
            <div className='Main-container'>
                <form action="#" className="Login-form">
                <fieldset>
                    <legend>Login to The Column</legend>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" />
                </fieldset>
                <p>Welcome back</p>
                <button type="submit">Login</button>
                </form>
            </div>
        </section>
    )
};