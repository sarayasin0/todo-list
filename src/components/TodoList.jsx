import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, DatePicker, message, Table, Space, Checkbox, Tag, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { saveTodos, getTodos,getLocalStorage } from '../pages/LocalStorage';
import moment from 'moment';

const { Option } = Select;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [deadline, setDeadline] = useState(null); // Initialize as null
  const [editTodoId, setEditTodoId] = useState(null);

  const currentUser = getLocalStorage('currentUser');

  useEffect(() => {
    if (currentUser) {
      const fetchedTodos = getTodos(currentUser.email);
      setTodos(fetchedTodos);
    }
  }, [currentUser]);

  const addOrUpdateTodo = () => {
    if (!title) {
      message.error('Please enter Title.');
      return;
    }

    const newTodoItem = {
      id: editTodoId || Date.now(),
      title,
      description,
      priority: selectedPriority,
      deadline: deadline ? deadline : 'N/A', 
      completed: false,
    };

    const updatedTodos = editTodoId
      ? todos.map(todo => (todo.id === editTodoId ? newTodoItem : todo))
      : [...todos, newTodoItem];

    setTodos(updatedTodos);
    saveTodos(currentUser.email, updatedTodos);
    resetForm();
    message.success(editTodoId ? 'Todo updated successfully' : 'Todo added successfully');
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(currentUser.email, updatedTodos);
  };

  const editTodo = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setSelectedPriority(todo.priority);
    setDeadline(todo.deadline !== 'N/A' ? moment(todo.deadline, 'YYYY-MM-DD') : null); // Convert string to moment object
    setEditTodoId(todo.id);
  };

  const completeTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(currentUser.email, updatedTodos);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedPriority('');
    setDeadline(null); // Reset to null
    setEditTodoId(null);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={getPriorityTagColor(priority)}>
          {priority}
        </Tag>
      ),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: 'Completed',
      key: 'completed',
      render: (_, record) => (
        <Checkbox
          checked={record.completed}
          onChange={() => completeTodo(record.id)}
          style={{ marginRight: '10px' }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => editTodo(record)} 
            type="text"
          />
        <Popconfirm title='are you sure?' onConfirm={() => deleteTodo(record.id)}>
        <Button 
            icon={<DeleteOutlined />} 
            type="text"
          />
        </Popconfirm>
        </Space>
      ),
    },
  ];

  const getPriorityTagColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'default';
    }
  };

  return (
    <div style={{border:'1px solid white',padding:'20px',borderRadius:'20px', minHeight:'70vh',boxShadow: '0 6px 12px rgba(0,0,0,0.2)', }}>
      <Form layout="inline" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'row', gap: '35px'}}>
        <Form.Item>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onPressEnter={addOrUpdateTodo}
            placeholder="Title"
            style={{ maxWidth: '300px' }}
          />
        </Form.Item>
        <Form.Item>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onPressEnter={addOrUpdateTodo}
            placeholder="Description"
            style={{ maxWidth: '300px' }}
          />
        </Form.Item>
        <Form.Item>
          <Select
            value={selectedPriority}
            onChange={(value) => setSelectedPriority(value)}
            style={{ width: 120, marginRight: '10px' }}
          >
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <DatePicker
            value={deadline ? moment(deadline) : null} 
            onChange={(date) => setDeadline(date ? date.format('YYYY-MM-DD') : null)} 
            format="YYYY-MM-DD"
            placeholder="Date"
            style={{ marginRight: '10px' }}
            disabledDate={(current) => current && current < moment().startOf('day')}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={addOrUpdateTodo} style={{ width: '100%' }}>
            {editTodoId ? 'Update Todo' : 'Add Todo'}
          </Button>
        </Form.Item>
      </Form>

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Table
          columns={columns}
          dataSource={todos}
          rowKey="id"
          rowClassName={(record) => (record.completed ? 'completed-row' : '')}
        />
      </div>
    </div>
  );
};

export default TodoList;
