import React, { Component } from 'react'
import { receivePostComments, updateCommentAction, removeCommentAction, addCommentAction } from '../actions/commentAction'
import { connect } from 'react-redux'
import { fetchPostComments, updateCommentVote, updateComment, deleteComment, addComment, deletePost, updatePostVote } from '../utils/api'
import * as ActionType from '../actions/actionTypes'
import Modal from 'react-modal'
import AddEditComment from './AddEditComment'
import FaComment from 'react-icons/lib/fa/comment'
import FaUser from 'react-icons/lib/fa/user'
import FaSort from 'react-icons/lib/fa/sort'
import { Link } from 'react-router-dom'
import Vote from './Vote'
import CommentCard from './CommentCard'
import { removePostAction, updatePostAction } from '../actions/postAction'
import { Redirect } from 'react-router'

const sortComments = (comments, sortBy) => {
  if (sortBy === ActionType.SortBy.VOTESCORE) {
    comments.sort((a, b) => b.voteScore - a.voteScore)
  } else {
    comments.sort((a, b) => b.timestamp - a.timestamp)
  }
  return comments
}

class Post extends Component {

  state = {
    commentsModalOpen: false,
    comment: null,
    redirectToPage: false
  }

  componentDidMount() {
    fetchPostComments(this.props.match.params.post).then(comments => this.props.receivePostComments(comments))
  }

  onSubmitCommentVote = (id, option) => {
    updateCommentVote(id, { 'option': option })
      .then(comment => this.props.updateCommentAction(comment))
  }

  onSubmitPostVote = (option) => {
    updatePostVote(this.props.match.params.post, { 'option': option })
      .then(post => this.props.updatePostAction(post))
  }

  onSubmitAction = (item, action) => {
    if (action === 'edit') {
      this.openCommentsModal(item)
    } else if (action === 'delete') {
      this.onDeleteComment(item)
    }
  }

  onSubmitComment = (values, comment) => {
    if (comment) {
      updateComment(comment.id, values)
        .then(comment => this.props.updateCommentAction(comment))
      this.closeCommentsModal()
    } else {
      values['parentId'] = this.props.match.params.post
      addComment(values).then(comment => this.props.addCommentAction(comment))
      this.closeCommentsModal()
    }
  }

  onDeleteComment = (comment) => {
    deleteComment(comment.id)
      .then(comment => this.props.removeCommentAction(comment))
  }

  onDeletePost = (post) => {
    deletePost(post.id)
      .then(res => this.props.removePostAction(post))
    this.setState({ redirectToPage: true })
  }

  openCommentsModal = (comment) => this.setState(() => ({ commentsModalOpen: true, comment }))
  closeCommentsModal = () => this.setState(() => ({ commentsModalOpen: false }))

  render() {
    const filterPost = this.props.posts.filter(post => post.id === this.props.match.params.post)
    const { commentsModalOpen, comment, redirectToPage } = this.state
    const post = filterPost.length ? filterPost[0] : null

    if (redirectToPage) {
      return (
        <Redirect to='/' />
      )
    }

    return (
      <div className='section'>
        <Link to="/">Go to Main</Link>
        {post ?
          <div>
            <h1 className='heading'>{post.title}</h1>
            <p className='desc'>{post.body}</p>
            <div className='footer'>
              <span><FaUser size={15} />&nbsp;{post.author}</span>
              <span><FaComment size={15} />&nbsp;{this.props.comments.length} comments</span>
              <span><FaSort size={15} />&nbsp;{post.voteScore} score</span>
              <Vote submitVote={this.onSubmitPostVote}></Vote>
            </div>
            <div className='dir'>
              <Link className='action-btn' to={{
                pathname: '/add',
                state: { categories: this.props.categories, post: post, prevPath: this.props.location.pathname }
              }}>Edit Post</Link>
              <button className='action-btn' onClick={() => this.onDeletePost(post)}>Delete Post</button>
            </div>
            <div className='section'>
              <h1 className='title'>Comments</h1>
            </div>
            <div>
              {this.props.comments.map((item) => (
                <CommentCard item={item} key={item.id} onSubmitVote={this.onSubmitCommentVote} action={this.onSubmitAction} />
              ))}
            </div>
            <div className='add'>
              <button className='action-btn' onClick={() => this.openCommentsModal()}>Add Comment</button>
            </div>
            <Modal
              className='modal'
              isOpen={commentsModalOpen}
              onRequestClose={this.closeCommentsModal}
              contentLabel='Modal'>
              {commentsModalOpen && <AddEditComment comment={comment} onSubmitComment={this.onSubmitComment} />}
            </Modal>
          </div>
          : <h1 className='heading'>No Post Found</h1>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: sortComments(state.comments.list, state.comments.sortBy),
    categories: state.categories,
    posts: state.posts.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    receivePostComments: (data) => dispatch(receivePostComments(data)),
    updateCommentAction: (data) => dispatch(updateCommentAction(data)),
    removeCommentAction: (data) => dispatch(removeCommentAction(data)),
    addCommentAction: (data) => dispatch(addCommentAction(data)),
    removePostAction: (data) => dispatch(removePostAction(data)),
    updatePostAction: (data) => dispatch(updatePostAction(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
