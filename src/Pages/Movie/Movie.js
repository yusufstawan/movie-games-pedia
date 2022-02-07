import React, { useContext, useEffect } from 'react';
import { Card, Divider, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { MovieGamesContext } from '../../Context/MovieGamesContext';

const { Meta } = Card;

const Movie = () => {
    const { movie, dispay, functions } = useContext(MovieGamesContext)

    const { functionsDataMovie } = functions

    useEffect(() => {

        functionsDataMovie()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Divider orientation="left">Movie</Divider>
            {dispay ? <Spin tip="Loading..." style={{ marginLeft: '50%' }}></Spin> : null}

            <div className='container'>
                {movie !== null && (
                    <>
                        {movie.map((res, index) => {
                            return (

                                <Link to={`movies/detail/${res.id}`} key={index}>
                                    <Card
                                        hoverable
                                        style={{ width: 250, marginBottom: '20px' }}
                                        cover={<img alt={res.title} className='images' src={res.image_url} />}
                                    >
                                        <Meta title={res.title} description={res.year} />
                                    </Card>
                                </Link>

                            )
                        })}
                    </>
                )}
            </div>
        </>
    )
};

export default Movie;
