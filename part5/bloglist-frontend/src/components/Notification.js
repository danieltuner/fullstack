import React from 'react'
const Notification = ({ message, errorMessage }) => {
    if (message === null && errorMessage === null) {
        return null
    }
    if (errorMessage) {
        return (
            <div className="error">
                {errorMessage}
            </div>
        )
    } else {
        return (
            <div className="message">
                {message}
            </div>
        )
    }
}

export default Notification 