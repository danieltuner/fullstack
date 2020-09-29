import React from 'react'

const Persons = ({persons, newFilter}) => {
    return (
        <div>{persons.filter(person =>
            person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person => <div key={person.name}>{person.name} {person.number} </div>)
            }
            </div>
    )
}

export default Persons