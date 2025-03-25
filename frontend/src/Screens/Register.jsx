import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: ''
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Check password strength when password changes
    if (name === "password") {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match!");
      }

      if (passwordStrength < 3) {
        throw new Error("Password is too weak. Please use a stronger password.");
      }

      const response = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name
      });

      alert('Registration successful! Redirecting to login...');
      navigate('/login');
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch(passwordStrength) {
      case 0: return "bg-danger";
      case 1: return "bg-danger";
      case 2: return "bg-warning";
      case 3: return "bg-info";
      case 4: return "bg-success";
      default: return "bg-secondary";
    }
  };

  const getPasswordStrengthText = () => {
    switch(passwordStrength) {
      case 0: return "Very Weak";
      case 1: return "Weak";
      case 2: return "Moderate";
      case 3: return "Strong";
      case 4: return "Very Strong";
      default: return "";
    }
  };

  return (
    <div className="register-page bg-light">
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              {/* Card Header with Art-themed Background */}
              <div className="card-header bg-gradient-primary text-white p-4 position-relative">
                <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25" 
                  style={{ background: "url('https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?q=80&w=1000') center/cover" }}>
                </div>
                <div className="position-relative z-index-1 text-center">
                  <h2 className="fw-bold mb-1">Join ArtVenture</h2>
                  <p className="mb-0">Create your account to start bidding on amazing art</p>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="card-body p-4 p-sm-5">
                {error && (
                  <div className="alert alert-danger rounded-3">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-envelope-fill text-muted"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="artist@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Username</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-person-fill text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">First Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-person text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        placeholder="Your first name"
                        value={formData.first_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Last Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-person text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        placeholder="Your last name"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-lock-fill text-muted"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {formData.password && (
                      <div className="mt-2">
                        <div className="progress" style={{ height: "5px" }}>
                          <div 
                            className={`progress-bar ${getPasswordStrengthColor()}`} 
                            role="progressbar" 
                            style={{ width: `${passwordStrength * 25}%` }}
                            aria-valuenow={passwordStrength * 25}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <small className={`text-${getPasswordStrengthColor().replace('bg-', '')}`}>
                          {getPasswordStrengthText()}
                        </small>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-lock-fill text-muted"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="termsCheck"
                      required
                    />
                    <label className="form-check-label small text-muted" htmlFor="termsCheck">
                      I agree to the <a href="/terms" className="text-decoration-none">Terms of Service</a> and <a href="/privacy" className="text-decoration-none">Privacy Policy</a>
                    </label>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg w-100 rounded-3 fw-bold py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
                
                <div className="text-center mt-4">
                  <p className="mb-0 text-muted">
                    Already have an account?{" "}
                    <Link to="/login" className="text-decoration-none fw-semibold">
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;