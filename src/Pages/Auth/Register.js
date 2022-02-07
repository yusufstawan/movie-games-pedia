import React, { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Divider } from 'antd';

const Register = () => {
    let history = useHistory()

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleRegister = (event) => {
        event.preventDefault()

        let { name, email, password } = input

        axios.post(`https://backendexample.sanbersy.com/api/register`,
            { name, email, password }
        ).then(() => {
            history.push('/login')
        })
            .catch(error => {
                alert(error)
            })
    }

    const handleChange = (event) => {
        let { name, value } = event.target
        setInput({ ...input, [name]: value })
    }

    return (
        <>
            <div className='form-login'>
                <Divider orientation="center"><h1>Registrasi</h1></Divider>
                <form onSubmit={handleRegister} method='post'>
                    <label>Nama</label>
                    <input required onChange={handleChange} value={input.name} type="text" name="name" placeholder="Your name..." />

                    <label>Email</label>
                    <input required onChange={handleChange} value={input.email} type="email" name="email" placeholder="Email.." />

                    <label>Password</label>
                    <input required onChange={handleChange} value={input.password} type="password" name="password" placeholder="Password.." />

                    <Button htmlType="submit" type="primary" block size="large" style={{ marginTop: "20px" }}>Register</Button>

                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <p>Sudah punya akun? <Link to='/login'>Login</Link></p>
                    </div>
                    <Button><Link to='/'>Ke halaman utama</Link></Button>
                </form>
            </div>
        </>
    )
};

export default Register;
