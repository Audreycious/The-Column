import config from '../config'

const AuthApiService = {
    postLogin(credentials) {
        return fetch(`${config.API_ENDPOINT}api/login`
        ,
            {
                method: 'POST',
                headers: {
                'content-type': 'application/json',
                },
                body: JSON.stringify(credentials),
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(e => Promise.reject(e))
                }
                return response.json()
            })
    }
}

export default AuthApiService