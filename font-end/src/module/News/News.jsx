import { Divider } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { onGetPostsList } from '../../redux/post/post.actions';
import { selectPostList } from '../../redux/post/post.selector';
import { selectTokenId } from '../../redux/user/user.selector';
import CreatePost from './Components/CreatePost/CreatePost';
import Post from './Components/Post/Post';

const News = ({posts,onGetPostsList}) => {
	useEffect(() => {
		if(!posts){
			onGetPostsList()
		}
	}, [posts])
    return (
        <div>
            <CreatePost/>
            <Divider/>
            {posts&&posts.map((post)=>{
                return (
                    <Post key={post._id} post={post}/>
                )
            })}
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    tokenId: selectTokenId,
	posts: selectPostList
})

const mapDispatchToProps = {
	onGetPostsList,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(News);;
// export default News;
