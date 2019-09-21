import React, { Component } from 'react'

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
        let loginInfo = this.state
        this.props.onLoginSubmit(loginInfo)
    }

    render() {
        return (
            <section className='Login-page'>
                <div className='Main-container'>
                    <form action="#" className="Login-form" onSubmit={this.handleLoginSubmit}>
                    <fieldset>
                        <legend>Login to The Column</legend>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} placeholder="Enter username" />
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Enter password" />
                    </fieldset>
                    <p>Welcome back</p>
                    <button type="submit">Login</button>
                    </form>
                </div>
            </section>
        )
    }
}