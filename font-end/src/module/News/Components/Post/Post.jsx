import { Avatar, Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./Post.scss";
const Post = ({ post }) => {

	console.log(post)
	return (
		<div className="post-wrapper">
			<div className="post-header">
				<Avatar />
				<div className="post-username">{post.user.name}</div>
			</div>
			<div className="post-content">
				{post.title}
			</div>
			<div className="post-footer">
                <Button type="primary" danger>Delete</Button>
                <Button type="primary" >Edit</Button>
            </div>
		</div>
	);
};
const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = {
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Post);;

