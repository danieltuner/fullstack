import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      id: persons.length + 1,
    }

  if (persons.some(person => 
    person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    }
    else
    {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      setNewFilter('')
    }

  
  }
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          filter shown with <input value={newFilter} 
          onChange={handleFilterChange}/>
        </div>
        <h2>add a new</h2>
        <div>
          name: <input value={newName}
          onChange={handlePersonChange} />          
        </div>
        <div> 
          number: <input value={newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>           
        {persons.filter(person =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person => <div key={person.name}>{person.name} {person.number} </div>)
          }
    </div>
  )
}

export default App