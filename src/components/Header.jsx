import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header style={{ width: '100%', backgroundColor: '#001529', color: '#fff', padding: '0 280px', position: 'fixed', top: 0,  left: 0 ,border:'1px solid #001529',
       borderBottomRightRadius:'15px',boxShadow: '0 6px 12px rgba(0,0,0,0.2)' }}>
      <h1 style={{ margin: 0, color: '#fff' }}>ToDo</h1>
    </Header>
  );
};

export default HeaderComponent;
