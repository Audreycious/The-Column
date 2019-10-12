import React, { Component } from 'react'
import { clearAuthToken } from "../../auth/token-service"
import history from "../../history";


export default class Header extends Component {
    handleLogout = () => {
        clearAuthToken()
        history.push('/')
    }

    render() {
        return (
            <header className="App-header">
                <div className="logout-container">
                </div>
                <div className="home-container">
                    <h1>The Column</h1>
                </div>
                <div className="logout-container">
                    {window.location.pathname === "/main-page" ? <button onClick={this.handleLogout} >Logout</button> : null}
                </div>
            </header>
        )
    }
    
}

