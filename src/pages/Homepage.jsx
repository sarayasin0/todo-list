import React from 'react';
import TodoList from '../components/TodoList';
import MenuComponent from '../components/Menu';
import HeaderComponent from '../components/Header';

const Homepage = () => {
  return (
    <div>
      <HeaderComponent />
      <MenuComponent />
      <div style={{ marginLeft: 256, marginTop: 64, padding: '20px' }}>
        <TodoList />
      </div>
    </div>
  );
};

export default Homepage;
