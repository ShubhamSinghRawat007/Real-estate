import { FaSearch, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // For hamburger menu
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleCloseMenu = (e) => {
    // Close the menu if clicking outside of it
    if (e.target.id === 'backdrop') {
      setMenuOpen(false);
    }
  };

  return (
    <header  className="bg-white shadow-lg">
      <div className="flex  items-center justify-between max-w-7xl mx-auto px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold text-gray-800">
          <span className="text-blue-600">Real</span>
          <span className="text-gray-900">Estate</span>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="hidden sm:flex items-center bg-gray-100 px-4 py-2 rounded-full shadow-sm max-w-md w-full"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-gray-700 focus:outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-gray-600" />
          </button>
        </form>

        {/* Hamburger Menu (Visible on Small Devices) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 text-2xl focus:outline-none"
        >
          <FaBars />
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center  space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            About
          </Link>
          <Link to="/profile" className="flex items-center">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="Profile"
                className="rounded-full h-8 w-8 object-cover border-2 border-blue-600"
              />
            ) : (
              <span className="text-gray-700 hover:text-blue-600 transition">
                Sign in
              </span>
            )}
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          id="backdrop"
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={handleCloseMenu}
        >
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-20 p-6">
            <nav className="flex flex-col items-start space-y-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition text-lg"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 transition text-lg"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 transition text-lg"
                onClick={() => setMenuOpen(false)}
              >
                {currentUser ? 'Profile' : 'Sign in'}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
