import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import axios from 'axios'
import Countries from './Components/Countries'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  
    
  const handleClick = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  

  return (
    <div>
      <Filter value={newFilter} handleFilterChange={handleFilterChange}/>
      <Countries countries={countries} newFilter={newFilter} handleClick={handleClick} />
    </div>
  )
}


export default App;
