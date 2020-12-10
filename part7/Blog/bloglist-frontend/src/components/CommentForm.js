import React, { useState } from 'react'
import { Button } from 'react-bootstrap'


const CommentForm = (props) => {
  const [comment, setComment] = useState('')
  return (
    <form>
      <input
        type='text'
        id='comment'
        value={ comment }
        onChange={({ target }) => setComment(target.value)}
      />
      <Button variant='success' type='submit' onClick={e => { e.preventDefault(); props.sendComment(comment) }}>Add comment:</Button>
    </form>
  )
}

export default CommentForm