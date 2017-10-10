import React from 'react'
import serializeForm from 'form-serialize'
import v4 from 'uuid/v4'

class AddEditComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body: props.comment ? props.comment.body : '',
      author: props.comment ? props.comment.author : '',
      title: this.props.comment ? 'Edit Comment' : 'Add Comment'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const values = serializeForm(event.target, { hash: true })
    if (!this.props.comment) {
      values['id'] = v4()
    }
    values['timestamp'] = Date.now()
    this.props.onSubmitComment(values, this.props.comment)
  }

  render() {
    return (
      <div className='modal-form'>
        <form onSubmit={this.handleSubmit}>
          <h1 className='title'>{this.state.title}</h1>
          <label>
            Author:
            <input
              type='text'
              name='author'
              placeholder='Author'
              disabled={this.props.comment ? true : false}
              value={this.state.author}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Comment:
            <textarea
              name='body'
              placeholder='Enter text here...'
              value={this.state.body}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" disabled={!this.state.author || !this.state.body} />
        </form>
      </div>
    )
  }
}

export default AddEditComment
