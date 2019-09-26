import config from '../config'

const TokenService = {
    makeBasicAuthToken(userName, password) {
        return window.btoa(`${userName}:${password}`)
      },
    saveAuthToken(token) {
        window.localStorage.setItem(config.TOKEN_KEY, token)
    },
    getAuthToken() {
        return window.localStorage.getItem(config.TOKEN_KEY)
    },
}
  
module.exports = TokenService