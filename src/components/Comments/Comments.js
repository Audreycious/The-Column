import React from 'react';
import uuid from "uuid/v4"
import './Comments.css'

export default function Comments(props) {
    const comments = props.comments.map((comment, i) => {
        const id = uuid()
        let username
        username = comment.username
        comment = comment.comment
        
        return (
            <div className='Comment' key={id}>
                {comment}
                <p className="Comment-username" >{username ? `by ${username}` : null}</p>
            </div>
        )
    })

    let display    
    if (!!comments.length) {
        display = comments
    }
    else display = <p className='comments-placeholder'>Be the first to comment!</p>
    return (
        <React.Fragment>
            {display}
        </React.Fragment>
    )
} 

Comments.defaultProps = {
    comments: []
}
