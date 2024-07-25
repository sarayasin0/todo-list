import React, { useState } from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { Button,Typography } from 'antd';

const {Title,Paragraph}=Typography;
const Authpage = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    const handleSignInClick = () => {
        setIsSignUp(false);
    };

    return (
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
            <div className="form-container sign-in-container">
                <SignIn onSignUpClick={handleSignUpClick} />
            </div>
            <div className="form-container sign-up-container">
                <SignUp onSignInClick={handleSignInClick} />
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <Title level={1} style={{color:'white'}}>Welcome Back!</Title>
                        <Paragraph className="text-white">To keep connected with us please login with your personal info</Paragraph>
                        <Button  type="default" onClick={handleSignInClick} size='middle'>Sign In</Button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <Title level={1} style={{color:'white'}}>Hello!</Title>
                        <Paragraph className="text-white">Enter your personal details and start your journey with us</Paragraph>
                        <Button  type='default' onClick={handleSignUpClick} size='middle'>Sign Up</Button>
                    </div>
                </div>
            </div>
        </div>
    );    
};

export default Authpage;
