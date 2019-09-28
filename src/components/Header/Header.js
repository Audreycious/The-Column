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
                <a href="https://the-column-app.now.sh/main-page"><h1>The Column</h1></a>
                {window.location.pathname === "/main-page" ? <button onClick={this.handleLogout} >Logout</button> : null}
            </header>
        )
    }
    
}

