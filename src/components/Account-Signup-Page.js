import React, { Component } from 'react';

export default class AccountSignupPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
        }
    }

    handleSignupSubmit = (event) => {
        event.preventDefault()
        let user = this.state
        this.props.onSignupSubmit(user)
    }

    handleInputChange = (event) => {
        const target = event.target
        const value = target.value 
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <section className='Account-signup-page'>
                <div className='Main-container'>
                    <form action="#" className="Signup-form" onSubmit={this.handleSignupSubmit}>
                    <fieldset>
                        <legend>Signup for The Column</legend>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" value={this.state.nameValue} onChange={this.handleInputChange} placeholder='Enter your name' />
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" onChange={this.handleInputChange} placeholder='Enter your email' />
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" onChange={this.handleInputChange} placeholder='Enter a username' />
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" onChange={this.handleInputChange} placeholder='Enter a password' />
                    </fieldset>
                    <p>Enter this site at your own risk</p>
                    <button type="submit" >Join</button>
                    </form>
                </div>
            </section>
        )
    }
}