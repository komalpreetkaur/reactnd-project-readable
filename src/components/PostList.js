import React, { Component } from 'react'
import * as ActionType from '../actions/actionTypes'
import { sortBy, updatePostAction } from '../actions/postAction'
import { updatePostVote } from '../utils/api'
import { connect } from 'react-redux'
import PostCard from './PostCard'

const sortPosts = (posts, sortBy) => {
  if (sortBy === ActionType.SortBy.VOTESCORE) {
    posts.sort((a, b) => b.voteScore - a.voteScore)
  } else {
    posts.sort((a, b) => b.timestamp - a.timestamp)
  }
  return posts
}

const filterPosts = (posts, category) => {
  let list = category ? posts.list.filter(post => category === post.category) : posts.list
  return sortPosts(list, posts.sortBy)
}

class PostList extends Component {

  onSubmitVote = (id, option) => {
    updatePostVote(id, { 'option': option })
      .then(post => this.props.updatePostAction(post))
  }

  render() {
    return (
      <div className='section'>
        <h1 className='title'>Posts</h1>
        {this.props.posts.length ?
          <div>
            <span className='label'>Sort By</span>
            <button className='btn' onClick={() => this.props.sortBy(ActionType.SortBy.VOTESCORE)} >Vote Score</button>
            <button className='btn' onClick={() => this.props.sortBy(ActionType.SortBy.TIMESTAMP)} >Timestamp</button>
          </div>
          : <div>No posts available</div>
        }
        <div>
          {this.props.posts.map((item) => (
            <PostCard
              item={item}
              key={item.id}
              onSubmitVote={this.onSubmitVote}
            />
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: filterPosts(state.posts, ownProps.category),
    sort: state.posts.sortBy
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortBy: (data) => dispatch(sortBy(data)),
    updatePostAction: (data) => dispatch(updatePostAction(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
