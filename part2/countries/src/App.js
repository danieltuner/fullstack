import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter] = useState('')

  const countries = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const countryObject = {
      /*name: newName,
      number: newNumber,
      date: new Date().toISOString()*/
    }

  
    const handleFilterChange = (event) => {
      console.log(event.target.value)
      setNewFilter(event.target.value)
    }
  }
  /* 
  
  useEffect(() => {
  console.log('effect')
  axios
    .get('https://restcountries.eu/rest/v2/all').then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
}, [])*/

  return (
    <div>
      <Filter value={newFilter} handleFilterChange={handleFilterChange}/>
    </div>
  )
}



export default App;
