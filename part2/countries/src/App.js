import React, { useState, useEffect } from 'react'

import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([]) 



  /*const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        set'Persons'(response.data)
      })
  }
  
  useEffect(hook, []) */

  return (
    <div>
      
    </div>
  )
}



export default App;
