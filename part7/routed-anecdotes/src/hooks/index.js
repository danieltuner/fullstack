import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const resetAll = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    resetAll
  }
}