import React from 'react'

const Persons = ({persons, newFilter, handleClick}) => {
    const filterPersons = persons
  .filter(nogo => nogo.name.toLowerCase().includes(newFilter.toLowerCase()))

    return (
        <div>{filterPersons.map(nogo => <li key={nogo.name}>{nogo.name} {nogo.number} <button onClick={handleClick} value={nogo.name}>delete</button></li>)}
            </div>
    )
}

export default Persons