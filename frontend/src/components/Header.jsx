import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Header.css"; // Import the CSS file

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
    <header className="header">
      {/* Logo */}
      <h1>
        <Link to="/" className="logo">ArtBid</Link>
      </h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          placeholder="Search artworks..." 
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">🔍</button>
      </form>

      {/* Navigation */}
      <nav className="nav-links">
        {!token ? (
          <>
            <Link to="/register" className="nav-link">Register</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        ) : (
          <>
            <Link to="/bidding" className="nav-link">Bidding</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
