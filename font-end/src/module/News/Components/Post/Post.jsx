import { Avatar } from 'antd';
import React from 'react';

const Post = ({post}) => {
    return (
        <div className="post-wrapper">
           <div className="post-header">
                <Avatar/>
                <div className="post-username">
                    dat
                </div>
           </div>
        </div>
    );
}

export default Post;
