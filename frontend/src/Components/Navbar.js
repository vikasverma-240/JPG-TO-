import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
// If you're using FontAwesome for icons, import it as well
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div className="header-2">
      <nav className="bg-purple-800 py-2 md:py-4">
        <div className="container px-4 mx-auto md:flex md:items-center">

          <div className="flex justify-between items-center">
            <Link to="/" className="font-bold text-xl text-white">JPG-TO</Link>
            <button onClick={handleNavCollapse} className="border border-solid border-gray-600 px-3 py-1 rounded text-white opacity-50 hover:opacity-75 md:hidden">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>

          <div className={`${isNavCollapsed ? 'hidden' : ''} md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0`} id="navbar-collapse">
            <Link to="/about" className="p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">About</Link>
            <Link to="/contact" className="p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Contact</Link>
            <Link to="/blog" className="p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Blog</Link>
          </div>
        </div>
      </nav>

      {/* Optionally, other sections of the component */}
    </div>
  );
};

export default Navbar;
