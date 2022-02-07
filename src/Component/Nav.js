import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import logo from '../logo.svg';
const { Header } = Layout;

const Nav = () => {
    let history = useHistory()

    const handleLogout = () => {
        Cookies.remove('token')
        history.push('/login')
    }

    const AuthComponent = () => {

        if (Cookies.get('token') === undefined) {
            return (
                <>
                    <Menu.Item key="4"><Link to={"/register"}>Register</Link></Menu.Item>
                    <Menu.Item key="5"><Link to={"/login"}>Login</Link></Menu.Item>
                </>
            )
        } else if (Cookies.get('token') !== undefined) {
            return (
                <>
                    <Menu.Item key="6" onClick={handleLogout}>Logout</Menu.Item>
                </>
            )
        }

    }

    return (
        <>
            <Header className="header">
                <img src={logo} alt="logo" className="logo App-logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to={"/"}>Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to={"/games"}>Games</Link></Menu.Item>
                    <Menu.Item key="3"><Link to={"/movies"}>Movie</Link></Menu.Item>
                    <AuthComponent />
                </Menu>
            </Header>
        </>
    )
};

export default Nav;
