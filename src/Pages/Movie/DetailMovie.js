import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Button } from 'antd';

const DetailMovie = () => {

    let { slug } = useParams()
    const [movie, setMovie] = useState([])

    useEffect(() => {

        if (slug !== undefined) {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie/${slug}`)
                .then((res) => {
                    let { data } = res
                    setMovie(data)
                })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="site-card-border-less-wrapper">
                <Card title={movie.title} bordered={false} style={{ width: "auto" }}>
                    <img src={movie.image_url} alt={movie.title} style={{ width: 400, marginBottom: 20 }} />
                    <p>Genre: {movie.genre}</p>
                    <p>Year: {movie.year}</p>
                    <p>Rating: {movie.rating}</p>
                    <p>Duration: {movie.duration}</p>
                    <p>Review: {movie.review}</p>
                    <p>Description: {movie.description}</p>
                    <br />
                    <Button type="primary"><Link to='/'>Ke halaman utama</Link></Button>
                </Card>
            </div>
        </>
    )
};

export default DetailMovie;
