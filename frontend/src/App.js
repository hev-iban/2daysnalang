import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Screens/Register";
import Login from "./Screens/Login";
import MainScreen from "./Screens/MainScreen";
import ArtBidding from "./Screens/ArtBidding";
import ArtDetail from "./Screens/ArtDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Always visible */}
        <Routes>
          <Route path="/" element={<MainScreen />} /> {/* Fix: Now shows MainScreen */}
          <Route path="/art/:id" element={<ArtDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bidding" element={<ArtBidding />} />
        </Routes>
        <Footer /> {/* Always at the bottom */}
      </div>
    </Router>
  );
}

export default App;
