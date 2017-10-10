const HEADERS = {
  'Authorization': '1234',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function fetchData(url, method, params) {
  return fetch(url, {
    method: method,
    headers: HEADERS,
    body: JSON.stringify(params)
  }).then(res => res.json())
}

export function fetchCategories() {
  return fetchData(`http://localhost:3001/categories`, 'GET')
}

export function fetchPosts() {
  return fetchData(`http://localhost:3001/posts`, 'GET')
}

export function fetchPostComments(id) {
  return fetchData(`http://localhost:3001/posts/${id}/comments`, 'GET')
}

export function addPost(post) {
  return fetchData(`http://localhost:3001/posts/`, 'POST', post)
}

export function updatePostVote(id, option) {
  return fetchData(`http://localhost:3001/posts/${id}`, 'POST', option)
}

export function updatePost(id, params) {
  return fetchData(`http://localhost:3001/posts/${id}`, 'PUT', params)
}

export function deletePost(id) {
  return fetch(`http://localhost:3001/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': '1234'
    },
  }).then(res => res)
}

export function addComment(comment) {
  return fetchData(`http://localhost:3001/comments/`, 'POST', comment)
}

export function updateCommentVote(id, option) {
  return fetchData(`http://localhost:3001/comments/${id}`, 'POST', option)
}

export function updateComment(id, params) {
  return fetchData(`http://localhost:3001/comments/${id}`, 'PUT', params)
}

export function deleteComment(id) {
  return fetchData(`http://localhost:3001/comments/${id}`, 'DELETE')
}
