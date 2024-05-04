import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Pages.js/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Home />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
