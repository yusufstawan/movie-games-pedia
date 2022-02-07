import React, { useContext, useEffect } from 'react';
import { Card, Divider, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { MovieGamesContext } from '../Context/MovieGamesContext';

const { Meta } = Card;

const Home = () => {

    const { movie, games, dispay, functions } = useContext(MovieGamesContext)

    const { functionsDataHome } = functions

    useEffect(() => {

        functionsDataHome()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Divider orientation="center"><h1>Movie</h1></Divider>
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
            <Divider orientation="center"><h1>Games</h1></Divider>
            {dispay ? <Spin tip="Loading..." style={{ marginLeft: '50%' }}></Spin> : null}

            <div className='container'>
                {games !== null && (
                    <>
                        {games.map((res, index) => {
                            return (

                                <Link to={`games/detail/${res.id}`} key={index}>
                                    <Card
                                        key={index}
                                        hoverable
                                        style={{ width: 250, marginBottom: '20px' }}
                                        cover={<img alt={res.name} className='images' src={res.image_url} />}
                                    >
                                        <Meta title={res.name} description={res.genre} />
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

export default Home;
