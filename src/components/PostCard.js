import React, { Component } from 'react'
import FaComment from 'react-icons/lib/fa/comment'
import FaUser from 'react-icons/lib/fa/user'
import FaSort from 'react-icons/lib/fa/sort'
import { Link } from 'react-router-dom'
import Vote from './Vote'
import { fetchPostComments } from '../utils/api'

class PostCard extends Component {

  state = {
    totalComments: 0
  }

  componentDidMount() {
    fetchPostComments(this.props.item.id).then(comments => {
      this.setState(() => ({ totalComments: comments.length }))
    })
  }

  submitVote = (option) => {
    this.props.onSubmitVote(this.props.item.id, option)
  }

  render() {
    const { item } = this.props
    return (
      <div className='card'>
        <Link to={{
          pathname: `/post/${item.category}/${item.id}`
        }}>
          <h3>{item.title}</h3>
        </Link>
        <p>{item.body}</p>
        <div className='footer'>
          <span>
            <FaUser size={15} />
            &nbsp;{item.author}
          </span>
          <span>
            <FaComment size={15} />
            &nbsp;{this.state.totalComments} comments
          </span>
          <span>
            <FaSort size={15} />
            &nbsp;{item.voteScore} score
          </span>
          <Vote submitVote={this.submitVote}></Vote>
        </div>
      </div>
    )
  }
}

export default PostCard
