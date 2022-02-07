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

const TableMovie = () => {

    let history = useHistory()

    const [movie, setMovie] = useState([])
    const [dispay, setDisplay] = useState(false)
    const [fetchStatus, setFetchStatus] = useState(true)
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

    useEffect(() => {

        setDisplay(true)

        let getData = async () => {
            let { data } = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            setMovie([...data])

            setDisplay(false)
        }

        if (fetchStatus) {
            getData()
            setFetchStatus(false)
        }

    }, [fetchStatus, setFetchStatus])

    const handleText = (params) => {
        if (params === undefined) {
            return ""
        } else {
            return params?.slice(0, 30) + "..."
        }
    }

    const handleDelete = (event) => {
        let dataId = parseInt(event.currentTarget.value)

        axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${dataId}`,
            { headers: { "Authorization": "Bearer " + Cookies.get('token') } }
        ).then(res => {
            setFetchStatus(true)
        })
    }

    const handleEdit = (event) => {
        let dataId = parseInt(event.currentTarget.value)

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

        axios.get(`https://backendexample.sanbersy.com/api/data-movie/${dataId}`)
            .then((res) => {
                let data = res.data
                // console.log(data)
                setInput(
                    description(data.description),
                    duration(data.duration),
                    genre(data.genre),
                    image_url(data.image_url),
                    rating(data.rating),
                    review(data.review),
                    title(data.title),
                    year(data.year)
                )
            })
        history.push(`/dashboard/movies/edit/${dataId}`)
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'title',
            sorter: (a, b) => a.title?.length - b.title?.length,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: (a, b) => a.description?.length - b.description?.length,
            defaultSortOrder: 'descend',
            render: (res) => <>{handleText(res)}</>
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            sorter: (a, b) => a.genre?.length - b.genre?.length,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            sorter: (a, b) => a.duration?.length - b.duration?.length,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating?.length - b.rating?.length,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Review',
            dataIndex: 'review',
            sorter: (a, b) => a.review?.length - b.review?.length,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Year',
            dataIndex: 'year',
            sorter: (a, b) => a.year?.length - b.year?.length,
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

    const data = movie

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    // search & filter

    const onSearch = (value) => {

        let searchData = async () => {
            let { data } = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)

            let search = data.filter((res) => {
                return Object.values(res).join(' ').toLowerCase().includes(value.toLowerCase())
            })
            setMovie([...search])

        }
        searchData()
    }

    const [filter, setFilter] = useState({
        duration: "",
        rating: "",
        tahun: ""
    })

    const onChangeFilter = (event) => {
        let { name, value } = event.target
        setFilter({ ...filter, [name]: value })
    }

    const handleFilter = (event) => {
        event.preventDefault()

        let { duration, rating, tahun } = filter

        let filterData = async () => {

            let { data } = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)

            let filter = data.filter((res) => {
                return res.duration === parseInt(duration) || res.rating === parseInt(rating) || res.year === parseInt(tahun)
            })
            setMovie([...filter])
            setFilter({
                duration: "",
                rating: "",
                tahun: ""
            })

        }
        filterData()
    }

    return (
        <>
            <Collapse onChange={callback}>
                <Panel header="Filter data" key="1">
                    <form onSubmit={handleFilter} method='post'>
                        <input required onChange={onChangeFilter} value={filter.duration} type="text" name="duration" placeholder='input duration...' />
                        <input required onChange={onChangeFilter} value={filter.rating} type="text" name="rating" placeholder='input rating...' />
                        <input required onChange={onChangeFilter} value={filter.tahun} type="text" name="tahun" placeholder='input tahun...' />
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

export default TableMovie;
