import React from 'react';
import uuid from "uuid/v4"
import './Comments.css'

export default function Comments(props) {
    const comments = props.comments.map((comment, i) => {
        const id = uuid()
        let username
        if (comment.username) {
            username = comment.username
            comment = comment.comment
        }
        return (
            <div className='Comment' key={id}>
                {comment}
                <p className="Comment-username" >{username ? `by ${username}` : null}</p>
            </div>
        )
    }
        
    )
    return (
        <React.Fragment>
            {comments}
        </React.Fragment>
    )
} 

Comments.defaultProps = {
    comments: []
}
