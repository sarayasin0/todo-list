import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Typography, notification, Card, Row, Col, Space } from 'antd';
import MenuComponent from '../components/Menu';
import HeaderComponent from '../components/Header';
import { EditOutlined } from '@ant-design/icons';
import { getLocalStorage, setLocalStorage } from './LocalStorage';

const { Title, Paragraph } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const user = getLocalStorage('currentUser') || { name: '', email: '', password: '' };
    setUserData(user);
    form.setFieldsValue(user);
  }, [form]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.setFieldsValue(userData);
  };

  const handleSubmit = (values) => {
    const users = getLocalStorage('users') || [];
    const updatedUsers = users.map(user =>
      user.email === userData.email ? { ...user, ...values } : user
    );
    setLocalStorage('users', updatedUsers);
    setLocalStorage('currentUser', values); // Store full user data
    setUserData(values);
    setIsEditing(false);
    notification.success({
      message: 'Profile Updated',
      description: 'Profile updated successfully',
    });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden'}}>
      <HeaderComponent />
      <MenuComponent />
      <div style={{ flex: 1, padding: '40px', marginLeft: '256px', marginTop: '34px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          style={{ 
            width: '100%', 
            maxWidth: '900px', 
            borderRadius: '15px', 
            boxShadow: '0 6px 12px rgba(0,0,0,0.2)', 
            padding: '30px', 
            background: '#fff' 
          }}
        >
          <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>Profile Information</Title>
          {!isEditing ? (
            <div>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Paragraph><strong>Name:</strong> {userData.name}</Paragraph>
                </Col>
                <Col span={24}>
                  <Paragraph><strong>Email:</strong> {userData.email}</Paragraph>
                </Col>
                <Col span={24}>
                  <Paragraph><strong>Password:</strong> {userData.password}</Paragraph>
                </Col>
              </Row>
              <Row justify="center" style={{ marginTop: '20px' }}>
                <Button 
                  type="primary" 
                  onClick={handleEdit} 
                  style={{ width: '120px', height: '40px', borderRadius: '8px' }} 
                  shape='round'
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
              </Row>
            </div>
          ) : (
            <Form
              form={form}
              layout="horizontal"
              onFinish={handleSubmit}
              style={{ marginTop: '20px' }}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input placeholder="Name" style={{ borderRadius: '8px' }} />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
              >
                <Input placeholder="Email" style={{ borderRadius: '8px' }} />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Password" style={{ borderRadius: '8px' }} />
              </Form.Item>
              <Form.Item>
                <div style={{ textAlign: 'center' }}>
                  <Space size="large">
                    <Button type="primary" htmlType="submit" style={{ width: '120px', height: '40px', borderRadius: '8px' }}>Save</Button>
                    <Button onClick={handleCancel} style={{ width: '120px', height: '40px', borderRadius: '8px' }}>Cancel</Button>
                  </Space>
                </div>
              </Form.Item>
            </Form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Profile;
