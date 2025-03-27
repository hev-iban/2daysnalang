import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Register from "./Screens/Register";
import Login from "./Screens/Login";
import MainScreen from "./Screens/MainScreen";
import ArtBidding from "./Screens/ArtBidding";
import ArtDetail from "./Screens/ArtDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./footer/About";
import Contact from "./footer/Contact";
import FAQs from "./footer/FAQS";
import PrivacyPolicy from "./footer/PrivacyPolicy";
import TermsOfService from "./footer/TermsOfService";


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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        <Footer /> {/* Always at the bottom */}
      </div>
    </Router>
  );
}

export default App;
