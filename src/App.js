import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authpage from './pages/Authpage';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import './assets/styles/style.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Authpage />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;
