import React from 'react'

const Notification = ({ message, error }) => {
    if (message === null && error === null) {
      return null
    }
    else if (message !== null)
    {
        return (
            <div className="error">
              {message}
            </div>
          )
    }
    else if (error !== null)
    {
        return (
            <div className="megaError">
              {error}
            </div>
          )
    }
    
  }

export default Notification