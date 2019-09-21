import React from 'react';

export default function Comments(props) {
    const comments = props.comments.map((comment, i) => 
        <div className='Comment' key={i} >{comment}</div>
    )
    return (
        <React.Fragment>
            {comments}
        </React.Fragment>
    )
} 
