import './notification.css'
import React from 'react'

const Notification = ({ type, message }) => {
  if (message === '') {
    return null
  }

  let className = 'message'
  if (type) {
    className += ` ${type}`
  }

  return <div className={className}>{message}</div>
}

export default Notification
