import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, user, blogs, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  // console.log('blog', blog.title, blog.user.username, user.username)
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  // const hideWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const like = async () => {
    try {
      const update = { ...blog, likes: likes + 1 }
      const updatedBlogs = await blogService.update(blog.id, update)
      setLikes(updatedBlogs.likes)
    }catch(exception) {
      console.log(exception)
    }
  }
  const remove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteById(blog.id)
        const leftBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(leftBlogs)
      }catch(exception) {
        console.log(exception)
      }
    }
  }
  return (
    <div style={blogStyle} className="blog">
      <div className="blog-header">
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible? 'hide' : 'show'}</button>
      </div>
      {visible &&
        <div className="blog-content">
          <p className='url'>{blog.url}</p>
          <p>likes <span className='likes'>{likes}</span> <button id='like' onClick={like}>like</button></p>
          <p>{blog.author}</p>
          {user && blog.user.username === user.username && <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={remove} id="remove">remove</button>}
        </div>
      }
    </div>
  )
}

export default Blog