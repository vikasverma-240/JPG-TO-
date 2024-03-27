import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './Components/Fileupload.js/Upload';
import About from './Components/Pages.js/About';
import Contact from './Components/Pages.js/Contact';
import Blog from './Components/Pages.js/Blog';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Moved Navbar outside of Routes */}
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
