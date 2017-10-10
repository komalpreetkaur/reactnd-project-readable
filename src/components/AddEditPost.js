import React, { Component } from 'react'
import { addPostAction, updatePostAction } from '../actions/postAction'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import v4 from 'uuid/v4'
import { addPost, updatePost } from '../utils/api'
import { Redirect } from 'react-router'

class AddEditPost extends Component {

  constructor(props) {
    super(props);
    const { post, prevPath } = props.location.state
    this.state = {
      body: post ? post.body : '',
      author: post ? post.author : '',
      title: post ? post.title : '',
      category: post ? post.category : '',
      redirectToPage: false,
      prevPath: prevPath ? prevPath : '/'
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

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    if (!this.props.location.state.post) {
      values['id'] = v4()
      values['timestamp'] = Date.now()
      addPost(values).then(post => this.props.addPostAction(post))
    } else {
      updatePost(this.props.location.state.post.id, values).then(post => this.props.updatePostAction(post))
    }


    this.setState({ redirectToPage: true })
  }

  render() {
    if (this.state.redirectToPage) {
      return (
        <Redirect to={this.state.prevPath} />
      )
    }
    return (
      <div className='modal-form'>
        <Link to='/'>Go To Main</Link>
        <form className='form-box' onSubmit={this.handleSubmit}>
          <label>
            Author
             <input
              type='text'
              name='author'
              placeholder='Author'
              disabled={this.props.location.state.post ? true : false}
              value={this.state.author}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Title
             <input
              type='text'
              name='title'
              placeholder='title'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Body
             <textarea
              name='body'
              placeholder='Enter text here...'
              value={this.state.body}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Select Category
             <select disabled={this.props.location.state.post ? true : false} name='category' value={this.state.category} onChange={this.handleChange}>
              {this.props.location.state.categories.map((category) => (
                <option key={category.name} value={category.name}>{category.name}</option>
              ))}
            </select>
          </label>
          <input type="submit" value="Submit" disabled={!this.state.author || !this.state.body || !this.state.title}/>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPostAction: (data) => dispatch(addPostAction(data)),
    updatePostAction: (data) => dispatch(updatePostAction(data))
  }
}

export default connect(null, mapDispatchToProps)(AddEditPost)
