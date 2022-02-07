import axios from "axios";
import React, { createContext, useState } from "react";

export const MovieGamesContext = createContext()

export const MovieGamesProvider = props => {

    const [movie, setMovie] = useState([])
    const [games, setGames] = useState([])
    const [dispay, setDisplay] = useState(false)

    const functionsDataHome = () => {
        setDisplay(true)

        let getData = async () => {
            let { data } = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            let result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            setMovie([...data])
            setGames([...result.data])

            setDisplay(false)
        }
        getData()
    }

    const functionsDataGames = () => {
        setDisplay(true)

        let getData = async () => {
            let result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            setGames([...result.data])

            setDisplay(false)
        }

        getData()
    }

    const functionsDataMovie = () => {
        setDisplay(true)

        let getData = async () => {
            let { data } = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            setMovie([...data])

            setDisplay(false)
        }

        getData()
    }

    const functions = {
        functionsDataHome,
        functionsDataGames,
        functionsDataMovie
    }

    return (
        <MovieGamesContext.Provider value={{
            movie,
            setMovie,
            games,
            setGames,
            dispay,
            setDisplay,
            functions

        }}>
            {props.children}
        </MovieGamesContext.Provider>
    )

}
