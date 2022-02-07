import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const FormMovie = () => {
    let history = useHistory()

    const [input, setInput] = useState({
        description: "",
        duration: "",
        genre: "",
        image_url: "",
        rating: "",
        review: "",
        title: "",
        year: "",
    })

    const handleChange = (event) => {
        let { name, value } = event.target

        setInput({ ...input, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let {
            description,
            duration,
            genre,
            image_url,
            rating,
            review,
            title,
            year
        } = input

        axios.post(`https://backendexample.sanbersy.com/api/data-movie`,
            { description, duration, genre, image_url, rating, review, title, year },
            { headers: { "Authorization": "Bearer " + Cookies.get('token') } }
        )
            .then(() => {
                history.push('/dashboard/movies')
            })
            .catch(err => {
                alert(err.message)
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='form-input' method='post'>
                <label>Title</label>
                <input required value={input.title} onChange={handleChange} type="text" name='title' />

                <label>Description</label>
                <input required value={input.description} onChange={handleChange} type="text" name='description' />

                <label>Genre</label>
                <input required value={input.genre} onChange={handleChange} type="text" name='genre' />

                <label>Duration</label>
                <input required value={input.duration} onChange={handleChange} type="number" name='duration' />

                <label>Rating</label>
                <input required value={input.rating} onChange={handleChange} type="number" name='rating' min={0} max={10} />

                <label>Review</label>
                <input required value={input.review} onChange={handleChange} type="text" name='review' />

                <label>Year</label>
                <input required value={input.year} onChange={handleChange} type="number" name='year' min={1980} max={2021} />

                <label>Images</label>
                <input required value={input.image_url} onChange={handleChange} type="url" name='image_url' />

                <input type="submit" value="Submit" />
            </form>
        </>
    )
};

export default FormMovie;
