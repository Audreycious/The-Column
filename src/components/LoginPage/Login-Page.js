import React, { Component } from 'react'
import { makeAuthToken, saveAuthToken, getAuthToken } from "../../auth/token-service";
import config from '../../config'
import './Login-Page.css'

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
          username: [],
          password: [],
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

    handleLoginSubmit = (event) => {
        event.preventDefault()
        saveAuthToken(
            makeAuthToken(this.state.username, this.state.password)
        )
        let loginURL = config.API_ENDPOINT + `api/login`
        
        fetch(loginURL,
            {
                method: 'POST',
                headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${getAuthToken()}`
                },
            })
            .then(response => {
                if (!response.ok) {
                return response.json().then(responseJson => Promise.reject(responseJson))
                }
                return response.json()
            })
            .then(response => {
                console.log(response)
                // TODO: Store the user login in the session
                this.props.history.push('/main-page')
            })
            .catch(error => {
                alert(error)
            })
    }

    render() {
        return (
            <section className='Login-page'>
                <div className='toolbar'>
                </div>
                <div className='Main-container Login-container'>
                    <form action="#" className="Login-form" onSubmit={this.handleLoginSubmit}>
                    <fieldset>
                        <legend>Login to The Column</legend>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} placeholder="Enter username" />
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Enter password" />
                    </fieldset>
                    <p>Welcome back, columnist</p>
                    <button type="submit">Login</button>
                    </form>
                </div>
            </section>
        )
    }
}