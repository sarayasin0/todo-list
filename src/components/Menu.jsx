import React from 'react';
import { Image, Menu } from 'antd';
import { FileDoneOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import Logout from './Logout';
import { Link } from 'react-router-dom';
import todo from '../assets/img/sticky-note.png';

const MenuComponent = () => {
  return (
    <div style={{
      width: 250,
      backgroundColor: '#001529',
      border:'1px solid #001529',
      borderBottomRightRadius:'15px',
      borderStartEndRadius:'85px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      padding: '20px',
      color: '#fff', 
      boxShadow: '8px 0 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for separation
    }}>
      <div style={{ textAlign: 'center',marginBottom: '30px',paddingTop:'45px' }}>
        <Image 
          src={todo} 
          alt="App Logo" 
          style={{ width: '65%' }} 
        />
      </div>
      <Menu
        mode="inline"
        theme='dark'
        style={{
          height: '100%',
          backgroundColor: 'transparent', 
          color: '#fff', 
        }}
      >
        <Menu.Item key="homepage" icon={<FileDoneOutlined style={{ color: '#1890ff' }} /> } >
          <Link to="/homepage" style={{ color: '#fff' }}>Tasks</Link>
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined style={{ color: '#52c41a' }} />}>
          <Link to="/profile" style={{ color: '#fff' }}>Profile</Link>
        </Menu.Item>
        <Menu.Item key="logout" icon={<LoginOutlined style={{ color: '#ff4d4f' }} />}>
          <Logout />
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuComponent;
