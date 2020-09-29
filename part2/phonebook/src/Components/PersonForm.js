import React from 'react' 

const PersonForm = ({addPerson, handlePersonChange, handleNumberChange, newName, newNumber}) => {
    return (
<form onSubmit={addPerson}>
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
)
}
export default PersonForm