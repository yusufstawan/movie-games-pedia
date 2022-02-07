import React, { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom';
import { Divider } from 'antd';

const Login = () => {

    let history = useHistory()

    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        let { name, value } = event.target

        setInput({ ...input, [name]: value })
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        let { email, password } = input

        try {

            let result = await axios.post(`https://backendexample.sanbersy.com/api/user-login`, { email, password })
            let { data } = result
            let { token } = data
            Cookies.set('token', token, { expires: 1 })
            history.push('/')

        } catch (error) {

            let { data } = error.response
            alert(data.error)

        }

    }

    return (
        <>
            <div className='form-login'>
                <Divider orientation="center"><h1>Login</h1></Divider>
                <form onSubmit={handleLogin} method='post'>
                    <label>Email</label>
                    <input required onChange={handleChange} value={input.email} type="email" id="fname" name="email" placeholder="Email.." />

                    <label>Password</label>
                    <input required onChange={handleChange} value={input.password} type="password" id="lname" name="password" placeholder="Password.." />

                    <Button htmlType="submit" type="primary" block size="large" style={{ marginTop: "20px" }}>Login</Button>

                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <p>Belum punya akun? <Link to='/register'>Register</Link></p>
                    </div>
                    <Button><Link to='/'>Ke halaman utama</Link></Button>
                </form>
            </div>
        </>
    )
};

export default Login;
