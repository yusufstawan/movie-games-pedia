import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card } from 'antd';

const DetailGames = () => {
    let { slug } = useParams()
    const [games, setGames] = useState([])

    useEffect(() => {

        if (slug !== undefined) {
            axios.get(`https://backendexample.sanbersy.com/api/data-game/${slug}`)
                .then((res) => {
                    let { data } = res
                    setGames(data)
                })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSinglePlayer = () => {
        if (games.singlePlayer) {
            return 'Ya'
        } else {
            return 'Tidak'
        }
    }

    const handleMultiPlayer = () => {
        if (games.multiplayer) {
            return 'Ya'
        } else {
            return 'Tidak'
        }
    }

    return (
        <>
            <div className="site-card-border-less-wrapper">
                <Card title={games.name} bordered={false} style={{ width: "auto" }}>
                    <img src={games.image_url} alt={games.name} style={{ width: 400, marginBottom: 20 }} />
                    <p>Genre: {games.genre}</p>
                    <p>Relase: {games.release}</p>
                    <p>Platform: {games.platform}</p>
                    <p>Single Player: {handleSinglePlayer(games.singlePlayer)}</p>
                    <p>Multi Player: {handleMultiPlayer(games.multiplayer)}</p>
                    <Button type="primary"><Link to='/'>Ke halaman utama</Link></Button>
                </Card>
            </div>
        </>
    )
};

export default DetailGames;
