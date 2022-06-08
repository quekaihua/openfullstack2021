import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect( () => {
    const getBlogs = async () => {
      const reveiedBlogs = await blogService.getAll()
      const orderBlogs = reveiedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(orderBlogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (user) => {
    console.log('login with', user)
    try {
      const loginUser = await loginService.login(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loginUser))
      setUser(loginUser)
      blogService.setToken(loginUser.token)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    console.log('create blog with', blog)
    try {
      const savedblog = await blogService.create(blog)
      setBlogs(blogs.concat(savedblog))
      setSuccessMessage(`a new blog ${savedblog.title} by ${savedblog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const renderedBlog = () => {
    return blogs.map((blog) => <Blog key={blog.id} blog={blog} blogs={blogs} user={user} setBlogs={setBlogs} />)
  }

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage !== null && (
        <Notification type="error" message={errorMessage} />
      )}
      {successMessage !== null && (
        <Notification type="success" message={successMessage} />
      )}
      {user === null && <Togglable buttonLabel="login">
        <LoginForm login={login}
        />
      </Togglable>
      }
      {user !== null && (
        <div>
          {user.name} logged in{' '}
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog}
            />
          </Togglable>
        </div>
      )}
      {user !== null && renderedBlog()}
    </div>
  )
}

export default App
