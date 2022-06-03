
import { Button, Menu, Typography } from 'antd';
import React, { useContext } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserOutlined } from '@ant-design/icons';


export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, userName } = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        logout();
        navigate('/');
    }

    return (
        <nav className='menuBar'>
            <div className="logo">
                <Typography.Title level={3}>COGNIZANT CHALLEHGE</Typography.Title>
            </div>
            <div className='mainMenu'>
                <Menu
                    mode='horizontal'
                    selectedKeys={location.pathname}
                    theme='dark'
                >
                    <Menu.Item key={'/solve'} className='menuButton'>
                        <NavLink to="/solve">SOLVE</NavLink>
                    </Menu.Item>
                    <Menu.Item key={'/topthree'} className='menuButton'>
                        <NavLink to="/topthree">TOP 3</NavLink>
                    </Menu.Item>
                </Menu>
            </div>
            <div className='userLogo'>
                <Typography.Text>{userName}</Typography.Text>
            </div>
            <div className='userLogo'>
                <UserOutlined />
            </div>
            <div className='logoutButton'>
                <Button type='link' onClick={logoutHandler}>logout</Button>
            </div>
        </nav>
    );
}
