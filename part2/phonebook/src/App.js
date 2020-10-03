import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  
  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString()
    }


    personService
      .create(personObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewName('')
      })

  if (persons.some(person => 
    person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    }
    else
    {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')      
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
  const handleClick = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} name={newName} number={newNumber}/>
      <h2>Numbers</h2>           
      <Persons persons={persons} newFilter={newFilter} handleClick={handleClick}/>
    </div>
  )
}

export default App