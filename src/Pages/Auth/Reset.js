import React, { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { Divider } from 'antd';

const Reset = () => {

    let history = useHistory()

    const [input, setInput] = useState({
        current_password: "",
        new_password: "",
        new_confirm_password: ""
    })

    const handleChange = (event) => {
        let { name, value } = event.target
        setInput({ ...input, [name]: value })
    }


    const handleChangePassword = (event) => {
        event.preventDefault()

        let { current_password, new_password, new_confirm_password } = input

        axios.post(`https://backendexample.sanbersy.com/api/change-password`,
            { current_password, new_password, new_confirm_password },
            { headers: { "Authorization": "Bearer " + Cookies.get('token') } }
        )
            .then(() => {
                history.push('/')
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <>
            <div className='form-login'>
                <Divider orientation="center"><h1>Change Password</h1></Divider>
                <form onSubmit={handleChangePassword} method='post'>
                    <label>Password </label>
                    <input required onChange={handleChange} value={input.current_password} type="password" name="current_password" placeholder="Password.." />

                    <label>Password baru</label>
                    <input required onChange={handleChange} value={input.new_password} type="password" name="new_password" placeholder="New Password.." />

                    <label>Konfirmasi Password baru</label>
                    <input required onChange={handleChange} value={input.new_confirm_password} type="password" name="new_confirm_password" placeholder="Confirm Password.." />

                    <Button htmlType="submit" type="primary" block size="large" style={{ marginTop: "20px" }}>Reset Password</Button>
                </form>
            </div>
        </>
    )
};

export default Reset;
