import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-4">
      <div className="container">
        <div className="row">
          {/* Social Media */}
          <div className="col-md-3 text-center mb-3">
            <h5>Follow Us</h5>
            <a href="https://facebook.com" className="text-light mx-2">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="text-light mx-2">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" className="text-light mx-2">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" className="text-light mx-2">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/about" className="text-light">About Us</a></li>
              <li><a href="/auctions" className="text-light">Live Auctions</a></li>
              <li><a href="/contact" className="text-light">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-3">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li><a href="/help" className="text-light">Help Center</a></li>
              <li><a href="/faq" className="text-light">FAQs</a></li>
              <li><a href="/privacy" className="text-light">Privacy Policy</a></li>
              <li><a href="/terms" className="text-light">Terms of Service</a></li>
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
