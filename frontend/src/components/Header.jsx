import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if user is logged in
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login after logout
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1>
        <Link 
          to="/" 
          className="text-blue-500 text-2xl font-bold hover:text-blue-300"
        >
          ArtBid
        </Link>
      </h1>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center bg-white rounded p-1">
        <input 
          type="text" 
          placeholder="Search artworks..." 
          className="p-2 rounded-l text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-700">
          Search
        </button>
      </form>
      
      <nav>
        {!token && (
          <>
            <Link to="/register" className="mx-2 hover:text-gray-300">Register</Link>
            <Link to="/login" className="mx-2 hover:text-gray-300">Login</Link>
          </>
        )}
        <Link to="/bidding" className="mx-2 hover:text-gray-300">Bidding</Link>
        {token && (
          <>
            <Link to="/profile" className="mx-2 hover:text-gray-300">Profile</Link>
            <button 
              onClick={handleLogout} 
              className="mx-2 bg-red-500 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
