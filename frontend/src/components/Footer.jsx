import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";



export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-4">
      <div className="container">
        <div className="row">
          {/* Social Media */}
          <div className="col-md-3 text-center mb-3">
  <h5>Follow Us</h5>
  <a href="https://www.facebook.com/profile.php?id=100008506117228" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
    <i className="fab fa-facebook fa-2x"></i> {/* Facebook logo */}
  </a>
  <a href="https://www.instagram.com/confy_ash/" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
    <i className="fab fa-instagram fa-2x"></i> {/* Instagram logo */}
            </a>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-3">
            <h5>Support</h5>
            <ul className="list-unstyled">
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-3">
            <h5>Newsletter</h5>
            <p>Subscribe to get the latest updates.</p>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Your email"
              />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center bg-secondary py-3 mt-4">
        &copy; {new Date().getFullYear()} ArtBid. All Rights Reserved.
      </div>
    </footer>
  );
}
