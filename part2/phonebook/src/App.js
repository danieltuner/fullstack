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

  const killPerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) 
    {personService
    .kill(id)
    .then() 
    setPersons(persons.filter(nogo => id !==nogo.id))
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString()
    }

  if (persons.every((person) => person.name.toLowerCase() !== newName.toLowerCase()))
    {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
    

  else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
    {
      updateNumber(personObject)  
    }

  
  }

  const updateNumber = (person) => {
    const nextNumber = persons.find(nr => nr.name.toLowerCase() === person.name.toLowerCase()).id
    person = {...person, id: nextNumber}

    personService
    .update(nextNumber, person)
    .then(returnedPerson => {
      setPersons(persons.map(nr => nr.id !== nextNumber ? nr : returnedPerson))
      setNewName('')
      setNewNumber('')
    })
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
      <Filter value={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} name={newName} number={newNumber}/>
      <h2>Numbers</h2>           
      <Persons persons={persons} newFilter={newFilter} killPerson={killPerson}/>
    </div>
  )
}

export default App