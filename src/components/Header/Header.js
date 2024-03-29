import React, { Component } from 'react'
import { clearAuthToken } from "../../auth/token-service"
import history from "../../history";


export default class Header extends Component {
    handleLogout = () => {
        clearAuthToken()
        history.push('/')
    }

    handleWriteButton = () => {
        history.push('/main-page/write-article-page')
    }

    handleBackButton = () => {
        history.goBack()
    }

    render() {
        return (
            <header className="App-header">
                <div className="write-article-container header-buffer">
                    {window.location.pathname === "/main-page" ? <button className='write-new-article-button' onClick={this.handleWriteButton} >Write New Article</button> : null}
                    {window.location.pathname === "/main-page/write-article-page" ? <button className='back-button' onClick={this.handleBackButton} >Go back</button> : null}
                    {window.location.pathname === "/login-page" ? <button className='back-button' onClick={this.handleBackButton} >Go back</button> : null}
                    {window.location.pathname === "/account-signup-page" ? <button className='back-button' onClick={this.handleBackButton} >Go back</button> : null}
                </div>
                <div className="home-container">
                    <h1>The Column</h1>
                </div>
                <div className="logout-container header-buffer">
                    {window.location.pathname === "/main-page" || window.location.pathname === "/main-page/write-article-page" ? <button className='logout-button' onClick={this.handleLogout} >Logout</button> : null}
                </div>
            </header>
        )
    }
    
}

