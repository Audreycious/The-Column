import React, { Component } from 'react';
import { makeAuthToken, getAuthToken } from "../auth/token-service"
import config from "../config"

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

    handleSubmitSignupForm = (user) => {
        console.log(user)
        
    }
    handleSignupSubmit = (event) => {
        event.preventDefault()
        let user = this.state
        if (!user.name) {
            alert(`Name is required`)
            return
        }
        else if (!user.email) {
            alert(`Email is required`)
            return
        }
        else if (!user.username) {
            alert(`Username is required`)
            return
        }
        else if (!user.password) {
            alert(`Password is required`)
            return
        }
        else{
            window.localStorage.setItem(config.TOKEN_KEY, makeAuthToken(user.username, user.password))
            let usersURL = config.API_ENDPOINT + `api/users`
            fetch(usersURL,
                {
                    method: 'POST',
                    headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${getAuthToken()}`
                    },
                    body: JSON.stringify(user)
                })
                .then(response => {
                    if (!response.ok) {
                    return response.json().then(responseJson => Promise.reject(responseJson))
                    }
                    return response.json()
                })
                .then(resUser => {
                    console.log(resUser)
                    // TODO: Store the user login in the session
                    this.props.history.push('/main-page')
                })
                .catch(error => {
                    alert(error.error)
                })
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