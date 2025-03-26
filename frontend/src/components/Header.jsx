import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1>
        <Link 
          to="/main" 
          className="text-blue-500 text-2xl font-bold hover:text-blue-300"
        >
          ArtBid
        </Link>
      </h1>
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
