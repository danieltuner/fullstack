import React from 'react';
import Country from './Country'

const Countries = ({countries, newFilter, handleClick}) => {

  const filterCountries = countries
  .filter(nogo => nogo.name.toLowerCase().includes(newFilter.toLowerCase()))

  if(filterCountries.length > 10) {
    return 'Too many matches, specify another filter'
    }
    else if(filterCountries.length === 1) {
      return <Country country={filterCountries[0]} />
    }
    else {
      return (
        <ul>
          {filterCountries.map(nogo => <li key={nogo.alpha2Code}>{nogo.name} <button onClick={handleClick} value={nogo.name}>show</button></li>)}
        </ul>
      )
    }
}

export default Countries