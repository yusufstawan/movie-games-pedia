import React, { useEffect, useState } from 'react';
import { Button, Table, Spin } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Input, Collapse } from 'antd';
import { useHistory } from 'react-router-dom';

const { Panel } = Collapse;
function callback(key) {
    console.log(key);
}
const { Search } = Input;

const TableGames = () => {
    let history = useHistory()

    const [games, setGames] = useState([])
    const [dispay, setDisplay] = useState(false)
    const [fetchStatus, setFetchStatus] = useState(true)
    const [input, setInput] = useState({
        name: "",
        genre: "",
        singlePlayer: true,
        multiplayer: true,
        platform: "",
        release: "",
        image_url: ""
    })

    useEffect(() => {

        setDisplay(true)

        let getData = async () => {
            let result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            setGames([...result.data])

            setDisplay(false)
        }

        if (fetchStatus) {
            getData()
            setFetchStatus(false)
        }

    }, [fetchStatus, setFetchStatus])

    const handleDelete = (event) => {
        let dataId = parseInt(event.currentTarget.value)

        axios.delete(`https://backendexample.sanbersy.com/api/data-game/${dataId}`,
            { headers: { "Authorization": "Bearer " + Cookies.get('token') } }
        ).then(res => {
            setFetchStatus(true)
        })
    }

    const handleEdit = (event) => {
        let dataId = parseInt(event.currentTarget.value)

        let {
            name,
            genre,
            singlePlayer,
            multiplayer,
            platform,
            release,
            image_url
        } = input

        axios.get(`https://backendexample.sanbersy.com/api/data-game/${dataId}`)
            .then((res) => {
                let data = res.data
                // console.log(data)
                setInput(
                    name(data.name),
                    genre(data.genre),
                    genre(data.genre),
                    singlePlayer(data.singlePlayer),
                    multiplayer(data.multiplayer),
                    platform(data.platform),
                    release(data.release),
                    image_url(data.image_url)
                )
            })
        history.push(`/dashboard/games/edit/${dataId}`)
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name?.length - b.name?.length,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            sorter: (a, b) => a.genre?.length - b.genre?.length,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            sorter: (a, b) => a.platform?.length - b.platform?.length,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Release',
            dataIndex: 'release',
            sorter: (a, b) => a.release?.length - b.release?.length,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Single Player',
            dataIndex: 'singlePlayer',
            sorter: (a, b) => a.singlePlayer?.length - b.singlePlayer?.length,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Multi Player',
            dataIndex: 'multiplayer',
            sorter: (a, b) => a.multiplayer?.length - b.multiplayer?.length,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Action',
            key: 'action',
            render: (res, index) => (
                <>
                    {/* <Button onClick={handleEdit} value={res.id}>Edit</Button> */}
                    <Button onClick={handleDelete} value={res.id}>Delete</Button>
                </>
            )
        },
    ];

    const data = games

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    // search & filter

    const onSearch = (value) => {

        let searchData = async () => {
            let { data } = await axios.get(`https://backendexample.sanbersy.com/api/data-game`)

            let search = data.filter((res) => {
                return Object.values(res).join(' ').toLowerCase().includes(value.toLowerCase())
            })
            setGames([...search])

        }
        searchData()
    }

    const [filter, setFilter] = useState({
        genre: "",
        platform: "",
        release: ""
    })

    const onChangeFilter = (event) => {
        let { name, value } = event.target
        setFilter({ ...filter, [name]: value })
    }

    const handleFilter = (event) => {
        event.preventDefault()

        let { genre, platform, release } = filter

        let filterData = async () => {

            let { data } = await axios.get(`https://backendexample.sanbersy.com/api/data-game`)

            let filter = data.filter((res) => {
                return res.genre === genre || res.platform === platform || res.release === parseInt(release)
            })
            setGames([...filter])
            setFilter({
                genre: "",
                platform: "",
                release: ""
            })

        }
        filterData()
    }

    return (
        <>

            <Collapse onChange={callback}>
                <Panel header="Filter data" key="1">
                    <form onSubmit={handleFilter} method='post'>
                        <input required onChange={onChangeFilter} value={filter.genre} type="text" name="genre" placeholder='input genre...' />
                        <input required onChange={onChangeFilter} value={filter.platform} type="text" name="platform" placeholder='input platform...' />
                        <input required onChange={onChangeFilter} value={filter.release} type="text" name="release" placeholder='input release...' />
                        <input type={'submit'} value={"Filter"} />
                    </form>
                    <button className='input-reset' onClick={() => {
                        setFetchStatus(true)
                    }}>Reset Filter</button>
                </Panel>
            </Collapse>

            <br />

            <Search placeholder="Search..." allowClear onSearch={onSearch} style={{ width: 200, marginBottom: 40 }} />
            <Table columns={columns} dataSource={data} onChange={onChange} />
            {dispay ? <Spin tip="Loading..." style={{ marginLeft: '50%' }}></Spin> : null}
        </>
    )
};

export default TableGames;
