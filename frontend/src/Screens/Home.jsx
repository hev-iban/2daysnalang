import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="home-page bg-light">
      {/* Hero Section */}
      <div className="hero-section d-flex flex-column align-items-center justify-content-center vh-100 bg-primary text-white position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "url('https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1000') center/cover" }}></div>
        </div>
        
        <div className="container text-center position-relative z-index-1">
          <h1 className="display-3 fw-bold mb-4">🎨 Welcome to ArtVenture</h1>
          <p className="lead mb-5">Discover, bid, and own exquisite artworks from the world's most talented artists</p>
          
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/login" className="btn btn-light btn-lg px-4 py-2 rounded-pill fw-bold">
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-outline-light btn-lg px-4 py-2 rounded-pill fw-bold">
              Sign Up
            </Link>
          </div>
        </div>
        
        <div className="position-absolute bottom-0 start-0 w-100 text-center mb-3">
          <a href="#features" className="text-white text-decoration-none">
            <i className="bi bi-chevron-down fs-3"></i>
          </a>
        </div>
      </div>
      
      {/* Features Section */}
      <div id="features" className="py-5 bg-white">
        <div className="container py-5">
          <h2 className="text-center mb-5 fw-bold">Why Choose ArtVenture</h2>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper bg-primary bg-opacity-10 text-primary rounded-circle p-3 mb-3 mx-auto" style={{width: '60px', height: '60px'}}>
                    <i className="bi bi-gem fs-3"></i>
                  </div>
                  <h4 className="fw-bold">Exclusive Artworks</h4>
                  <p className="text-muted">Access unique pieces from emerging and established artists worldwide</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper bg-success bg-opacity-10 text-success rounded-circle p-3 mb-3 mx-auto" style={{width: '60px', height: '60px'}}>
                    <i className="bi bi-hammer fs-3"></i>
                  </div>
                  <h4 className="fw-bold">Live Bidding</h4>
                  <p className="text-muted">Experience the thrill of real-time auctions from anywhere</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-body text-center p-4">
                  <div className="icon-wrapper bg-info bg-opacity-10 text-info rounded-circle p-3 mb-3 mx-auto" style={{width: '60px', height: '60px'}}>
                    <i className="bi bi-shield-check fs-3"></i>
                  </div>
                  <h4 className="fw-bold">Secure Transactions</h4>
                  <p className="text-muted">Protected payments and verified authenticity for every artwork</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="py-5 bg-dark text-white">
        <div className="container py-5 text-center">
          <h2 className="fw-bold mb-4">Ready to Start Your Art Collection?</h2>
          <p className="lead mb-5">Join thousands of art enthusiasts discovering amazing artworks daily</p>
          <Link to="/signup" className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;