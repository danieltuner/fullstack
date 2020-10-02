import React from 'react';


const iconStyle = {
    width: '200px'
}

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p><b>Capital</b> {country.capital}</p>
            <p><b>Population</b> {country.population}</p>
            <h1>Languages</h1>
            <ul>
                {country.languages.map(annat => <li key={annat.iso639_1}>{annat.name}</li>)}
            </ul>
            <img src={country.flag} style={iconStyle} alt={country.name}/>

        </div>
    )
}




export default Country
