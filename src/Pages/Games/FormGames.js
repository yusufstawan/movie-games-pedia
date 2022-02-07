import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const FormGames = () => {
    let history = useHistory()

    const [input, setInput] = useState({
        genre: "",
        image_url: "",
        multiplayer: "",
        name: "",
        platform: "",
        release: "",
        singlePlayer: "",
    })

    const handleChange = (event) => {
        let { name, value } = event.target
        let modeplay = ["singlePlayer", "multiplayer"]

        if (modeplay.indexOf(name) === -1) {
            setInput({ ...input, [name]: value })
        } else {
            setInput({ ...input, [name]: !input[name] })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let {
            genre,
            image_url,
            multiplayer,
            name,
            platform,
            release,
            singlePlayer,
        } = input

        axios.post(`https://backendexample.sanbersy.com/api/data-game`,
            { genre, image_url, multiplayer, name, platform, release, singlePlayer },
            { headers: { "Authorization": "Bearer " + Cookies.get('token') } }
        )
            .then(() => {
                history.push('/dashboard/games')
            })
            .catch(err => {
                alert(err.message)
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='form-input' method='post'>
                <label>Nama</label>
                <input required value={input.name} onChange={handleChange} type="text" name='name' />

                <label>Genre</label>
                <input required value={input.genre} onChange={handleChange} type="text" name='genre' />

                <label>Platform</label>
                <input required value={input.platform} onChange={handleChange} type="text" name='platform' />

                <label>Release</label>
                <input required value={input.release} onChange={handleChange} type="number" name='release' min={2000} max={2021} />

                <label>Images</label>
                <input required value={input.image_url} onChange={handleChange} type="url" name='image_url' />

                <label >Mode Play</label>
                <br />
                <label style={{ display: "block", width: "150px" }}>
                    <b>Single Player :</b>
                    <input style={{ display: "inline-block", marginLeft: 8 }} onChange={handleChange} type="checkbox" name="singlePlayer" checked={input.singlePlayer} />
                </label>

                <label style={{ display: "block", width: "150px" }}>
                    <b>Multi Player :</b>
                    <input style={{ display: "inline-block", marginLeft: 8 }} onChange={handleChange} type="checkbox" name="multiplayer" checked={input.multiplayer} />
                </label>

                <input type="submit" value="Submit" />
            </form>
        </>
    )
};

export default FormGames;
