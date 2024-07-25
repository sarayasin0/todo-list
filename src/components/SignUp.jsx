import { Button, Form, Input, Typography,message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage,setLocalStorage } from '../pages/LocalStorage';

const { Title, Paragraph } = Typography;

const SignUp = ({ onSignInClick }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        const { name, email, password } = values;
        const users = getLocalStorage('users') || [];
      
        if (users.find(user => user.email === email)) {
          message.error('User already exists!');
        } else {
          users.push({ name, email, password });
          setLocalStorage('users', users);
          setLocalStorage('currentUser',({ name, email, password}))
          navigate('/homepage');
        }
      };
      
    return (
        <Form form={form} onFinish={handleSubmit} wrapperCol={{ span: 24 }} layout='vertical'>
            <Title level={2}>Sign Up</Title>
            <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
            >
                <Input placeholder='Name' />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[{ type: 'email', required: true, message: "Please input your email!" }]}
            >
                <Input placeholder='Email' />
            </Form.Item>

            <Form.Item
                name="password"
                wrapperCol={{ offset: 1, span: 22 }}
                rules={[{ required: true, message: "Please input your Password!" }]}
            >
                <Input.Password placeholder='Password' />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType='submit'>Sign Up</Button>
            </Form.Item>

            <Paragraph onClick={onSignInClick} style={{ cursor: 'pointer' }}>
                Already have an account? Sign In
            </Paragraph>

        </Form>
    );
};

export default SignUp;
