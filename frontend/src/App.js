import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './Screens/Register';
import Login from './Screens/Login';
import MainScreen from './Screens/MainScreen';
import ArtBidding from "./Screens/ArtBidding";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/register">Register</Link> | 
          <Link to="/login">Login</Link> | 
          <Link to="/bidding">Bidding</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<MainScreen />} />
          <Route path="/bidding" element={<ArtBidding />} /> {/* Added Art Bidding Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
