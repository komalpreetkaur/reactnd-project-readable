import React, { Component } from 'react'
import PostList from './PostList'
import { Link } from 'react-router-dom'

class Category extends Component {
  render() {
    const { category } = this.props.match.params
    return (
      <div className='section'>
        <Link to="/">Go to Main</Link>
        <h1 className='heading'>{category}</h1>
        <PostList category={category} />
      </div>
    )
  }
}
export default Category
