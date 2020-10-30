import React from 'react'

const Persons = ({persons, newFilter, killPerson}) => {
    const filterPersons = persons
    .filter(persons => 
    persons.name.toLowerCase().includes(newFilter.toLowerCase()))

    return (
        <div>{filterPersons.map(nogo => <div key={persons.name}>{persons.name} {persons.number}
        <button onClick={() => killPerson(persons.id)}>delete</button></div>)}
        </div>
    )
}

export default Persons