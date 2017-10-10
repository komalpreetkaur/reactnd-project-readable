import React, { Component } from 'react'
import FaUser from 'react-icons/lib/fa/user'
import FaSort from 'react-icons/lib/fa/sort'
import Vote from './Vote'

class CommentCard extends Component {

  submitVote = (option) => {
    this.props.onSubmitVote(this.props.item.id, option)
  }

  render() {
    const { item, action } = this.props
    return (
      <div className='card'>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
        <div className='footer'>
          <span>
            <FaUser size={15} />
            &nbsp;{item.author}
          </span>
          <span>
            <FaSort size={15} />
            &nbsp;{item.voteScore} score
          </span>
          <Vote submitVote={this.submitVote}></Vote>
        </div>
        <div>
          <button className='action-btn' onClick={() => action(item, 'edit')}>Edit</button>
          <button className='action-btn' onClick={() => action(item, 'delete')}>Delete</button>
        </div>
      </div>
    )
  }
}

export default CommentCard
