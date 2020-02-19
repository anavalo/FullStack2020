import React, {useState, useEffect} from 'react';
import axios from "axios"

const App = () => {

    const [newSearch, setNewSearch] = useState('')
    const [newFetch, setNewFetch] = useState([])

    useEffect(()=>{
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response=>{setNewFetch(response.data)})
      }, [newSearch])

    const handleSearchChange = (event)=>{
        setNewSearch(event.target.value)
      }

    const clength = newFetch.filter(p => p.name.toLowerCase().includes(newSearch)).map(c => c.name).length

    const countries = () => {
      if (clength>10){
        return(<div>too many countries</div>)
      } else if (clength<10 && clength > 1){
        return(
        newFetch.filter(p => p.name.toLowerCase()
        .includes(newSearch.toLowerCase()))
        .map(c => <li>{c.name}</li>))
      } else {
        return(
        newFetch.filter(p => p.name.toLowerCase()
        .includes(newSearch.toLowerCase()))
        .map(function(c){
          return (
            <div>
              <h1>{c.name}</h1>
              <li>Capital: {c.capital}</li>
              <li>Population: {c.population}</li>
              <h2>Languages</h2>
              <div>{c.languages.map(l => <ul key={l.index}>{l.name}</ul>)}</div>
              <img src={c.flag} width='100' height='80'></img>
            </div>
          )
        })
        )
      }
    }
    

    return(
      <div>
        <form>
          <div>
            Search for country
            <input value={newSearch} onChange={handleSearchChange}></input>
          </div>
        </form>
        <div>{countries()}</div>
      </div>

    )
}



export default App;
