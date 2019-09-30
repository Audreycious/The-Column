import React from 'react';
import uuid from "uuid/v4"

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
                <div className='Comment-text'>{comment}</div>
                <div className="Comment-username" >{username ? username : null}</div>
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
