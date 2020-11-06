import React from 'react'

const Persons = ({persons, newFilter, killPerson}) => {
    const filterPersons = newFilter === ''
        ? persons
        : persons.filter(nogo =>
            nogo.name.toLowerCase().includes(newFilter.toLowerCase()))

    return (
        <div>{filterPersons.map(nogo => <div key={nogo.name}>{nogo.name} {nogo.number}
        <button onClick={() => killPerson(nogo.id)}>delete</button></div>)}
        </div>
    )
}

export default Persons