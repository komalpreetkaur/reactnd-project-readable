import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Root from './Root'
import Category from './Category'
import AddEditPost from './AddEditPost'
import Post from './Post'
import { withRouter } from 'react-router-dom'
import { getCategories } from '../actions/categoryAction'
import { connect } from 'react-redux'
import { getPosts } from '../actions/postAction'

class App extends Component {

  componentDidMount() {
    this.props.getCategories()
    this.props.getPosts()
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <Root categories={this.props.categories} />
        )} />
        <Route exact path='/category/:category' component={Category} />
        <Route exact path='/add' component={AddEditPost} />
        <Route exact path='/post/:category/:post' component={Post} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(getCategories()),
    getPosts: () => dispatch(getPosts())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
