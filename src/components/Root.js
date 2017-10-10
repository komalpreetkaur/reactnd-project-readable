import React, { Component } from 'react'
import PostList from './PostList'
import { Link } from 'react-router-dom'

class Root extends Component {
  render() {
    return (
      <div className='container'>
        <div className='section'>
          <h1 className='title'>Categories</h1>
          <div className='list'>
            {this.props.categories.map((category) => (
              <div className='item' key={category.name}>
                <Link to={`/category/${category.name}`}>
                  {category.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <PostList />
        <div className='link-button'>
          <Link to={{
            pathname: '/add',
            state: { categories: this.props.categories }
          }}>Add Post</Link>
        </div>
      </div>
    )
  }
}

export default Root
