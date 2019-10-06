import React, { Component } from 'react'
import { saveAuthToken } from "../../auth/token-service";
import AuthApiService from "../../auth/auth-service"
import './Login-Page.css'

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
          username: "",
          password: "",
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
        const credentials = { username: this.state.username, password: this.state.password }
        
        AuthApiService.postLogin(credentials)
            .then(response => {
                this.setState({
                    username: "",
                    password: ""
                })
                saveAuthToken(response.authToken)
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