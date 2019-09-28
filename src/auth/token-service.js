import config from '../config'
function makeAuthToken(userName, password) {
        return (`${userName}:${password}`)
}

function saveAuthToken(token) {
        window.localStorage.setItem(config.TOKEN_KEY, token)
}

function getAuthToken() {
        return window.localStorage.getItem(config.TOKEN_KEY)
}

function hasAuthToken() {
    return !!getAuthToken()
}

function clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY)
}
  
export {
    makeAuthToken,
    saveAuthToken,
    getAuthToken,
    hasAuthToken,
    clearAuthToken
}