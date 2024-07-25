import React from 'react';
import { Form, Input, Button, Typography ,message} from 'antd';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage ,setLocalStorage} from '../pages/LocalStorage';
const { Title, Paragraph } = Typography;

const SignIn = ({ onSignUpClick }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        const { email, password } = values;
        const users = getLocalStorage('users') || [];
      
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
          setLocalStorage('currentUser', user); 
          navigate('/homepage');
        } else {
          message.error('Invalid credentials!');
        }
      };      

    return (
        <Form form={form} onFinish={handleSubmit} wrapperCol={{ span: 24 }} layout='vertical'>
            <Title level={2}>Sign In</Title>
            <Form.Item
                name="email"
                rules={[{ type: 'email', required: true, message: 'Please input a valid email!' }]}
            >
                <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="password"
                wrapperCol={{ offset: 1, span: 22 }}
                rules={[{ required: true, message: 'Please input a valid Password!' }]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType='submit'>Sign In</Button>
            </Form.Item>

            <Paragraph onClick={onSignUpClick} style={{ cursor: 'pointer' }}>
                Already have an account? Sign Up
            </Paragraph>

        </Form>
    );
};

export default SignIn;
