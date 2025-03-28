import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css"; // Import the CSS file

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <header className="header">
      {/* Logo */}
      <h1>
        <Link to="/" className="logo">ArtBid</Link>
      </h1>

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
            <span className="nav-link logout-link" onClick={handleLogout}>Logout</span>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
