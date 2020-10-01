import React, { useState, useEffect } from 'react'

import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([]) 



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
      
    </div>
  )
}



export default App;
