import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'INITIALIZE_BLOGS':
    return action.data
  case 'CREATE_BLOG': {
    return [...state, action.data]
  }
  default:
    return state
  }
}

/*export const newVote = (blog) => {
  return async dispatch => {
    const votedBlog = { ...blog, votes: blog.votes + 1 }
    const updatedBlog = await blogService.update(votedBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: updatedBlog
    })
  }
}*/
export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data
    })
  }
}

export const createBlogs = (content) => {
  return async dispatch => {
    const data = await blogService.create(content)
    dispatch({
      type: 'CREATE_BLOG',
      data
    })
  }
}

export default blogReducer