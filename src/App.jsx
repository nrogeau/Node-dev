import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/home';
import About from './Pages/about';
import Publications from './Pages/publications';
import Experiments from './Pages/experiments';


import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/About">About</Link></li>
            <li><Link to="/Publications">Publications</Link></li>
            <li><Link to="/Experiments">Experiments</Link></li>
          </ul>
        </nav>

        {/* Routes for the pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Publications" element={<Publications />} />
          <Route path="/Experiments" element={<Experiments />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
