import config from '../config'

const ApiService = {
    getAllArticles(userInfo) {
        let articlesURL = config.API_ENDPOINT + `api/articles`
        console.log(userInfo)

        fetch(articlesURL, {
            body: {
                username: '',
                password: ''
            }
        })
        .then(articles => {
            return articles
        })
    },
    getAllComments(userInfo) {
        console.log(userInfo)
        
        let commentsURL = config.API_ENDPOINT + `api/comments`
        fetch(commentsURL, {
            body: {
                username: '',
                password: ''
            }
        })
        .then(comments => {
            return comments
        })
    }
}

export default ApiService