import React, {useState} from 'react'
import axios from 'axios'

const Search = () => {
    // VARIABLES
    const [searchOption, setSearchOption] = useState("")
    const [id, setId] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)  
    const [starWars, setStarWars] = useState()
    const [homeWorld, setHomeWorld] = useState(""); 
    // ERROR VAR
    const [searchOptionError, setSearchOptionError] = useState("")
    const [idError, setIdError] = useState("")
    const [searchOptionStatus, setSearchOptionStatus] = useState(false)
    const [idStatus, setIdStatus] = useState(false)
    // HANDLE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault()
        if(searchOptionStatus === false){
            setSearchOptionError("Please Enter a Search Option")
        }
        if(idStatus === false){
            setIdError("Please Enter an Id")
        }
        else {
            // console.log("Search Option: ", searchOption)
            // console.log("ID: ", id) 
            fetchStarWars()
            message() 
            setIsSubmitted(true)
        }
    }
    // FETCH WITH AXIOS
    const fetchStarWars = () => {
        axios.get(`https://swapi.dev/api/${searchOption}/${id}`)
        .then(response=>{
            console.log(response.data)
            setStarWars(response.data)
        })
        .catch(err=>console.log(err))
    }
    // HANDLE SEARCH OPTION
    const handleSearchOption = (e) => {
        if(e.target.value.length < 1){
            setSearchOptionError("Please Enter a Search Option")
            setSearchOption("")
            setSearchOptionStatus(false)
        }
        else {
            setSearchOption(e.target.value)
            setSearchOptionError("")
            setSearchOptionStatus(true) 
        }
    }
    // HANDLE ID
    const handleId = (e) => {
        if(e.target.value < 1){
            setIdError("Please Enter an Id")
            setId("")
            setIdStatus(false)
        }
        else {
            setId(e.target.value)
            setIdError("")
            setIdStatus(true)
        }
    }
    const message = () => {
        if(searchOption === "people"){
            axios.get(starWars.homeworld)
            .then(homeworld=>{
                setHomeWorld(homeworld.data.name)
            })
            .catch(err=>console.log(err))
            return (
                <div>
                    <h1>Name: {starWars.name}</h1>
                    <h2>Height: {starWars.height} cm</h2>
                    <h2>Mass: {starWars.mass} kg</h2>
                    <h2>Hair Color: {starWars.hair_color}</h2>
                    <h2>Skin Color: {starWars.skin_color}</h2>
                    <h2>Home World: {homeWorld}</h2>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h1>Name: {starWars.name}</h1>
                    <h2>Climate: {starWars.climate}</h2>
                    <h2>Terrain: {starWars.terrain}</h2>
                    <h2>Surface Water: {starWars.surface_water}</h2>
                    <h2>Population: {starWars.population}</h2>
                </div>
            )
        }
    }
    // HTML
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">Search For: </label>
                    <select className="form-control" name="searchOption" value={searchOption} onChange={handleSearchOption}>
                        <option></option>
                        <option>people</option>
                        <option>planets</option>
                    </select>
                </div>
                {
                    searchOptionError?
                    <h3 className="mt-4">{searchOptionError}</h3>:
                    <h3></h3>
                }
                <div>
                    <label className="form-label">ID: </label>
                    <input type="number" name="id" value={id} className="form-control" onChange={handleId}/>
                </div>
                {
                    idError?
                    <h3 className="mt-4">{idError}</h3>:
                    <h3></h3>
                }
                <button className="mt-3 btn btn-primary">Search</button>
            </form>
            {
                isSubmitted?
                message():
                <h1></h1>
            }
        </div>
    )
}

export default Search