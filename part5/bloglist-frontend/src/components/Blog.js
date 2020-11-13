import React, { useState } from 'react'

const Blog = ({ blog,  updateBlog, user }) => {
  const [viewInfo, setViewInfo] = useState(false)


  const hideViewInfo = { display: viewInfo ? 'none' : '' }
  const showViewInfo = { display: viewInfo ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const id = blog.id
    updateBlog(id, blogObject)
  }

  return (
    <div style={blogStyle}>
      <div style={hideViewInfo}>
        {blog.title} by {blog.author}
         <button onClick={() => setViewInfo(true)}>view</button>
      </div>
      <div style={showViewInfo}>
        {blog.title} by {blog.author} 
        <button onClick={() => setViewInfo(false)}>hide</button>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => {handleClick()}}>like</button></div> 
       <div>{blog.user.name}</div>
      </div>
    </div>
  )
} 
export default Blog