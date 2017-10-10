import React, { Component } from 'react'
import FaArrowDown from 'react-icons/lib/fa/arrow-down'
import FaArrowUp from 'react-icons/lib/fa/arrow-up'

class Vote extends Component {
  render() {
    return (
      <div className='vote'>
        <span>Vote</span>
        <button onClick={() => this.props.submitVote('upVote')}>
          <FaArrowUp size={20} />
        </button>
        <button onClick={() => this.props.submitVote('downVote')}>
          <FaArrowDown size={20} />
        </button>
      </div>
    )
  }
}

export default Vote
