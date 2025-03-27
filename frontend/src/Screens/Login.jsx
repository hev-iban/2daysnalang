import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await loginUser(formData);

      // Store user details in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      navigate("/"); // ✅ Redirect to home page (http://localhost:3000/)
    } catch (error) {
      console.error("Error:", error);
      setError(error.error || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page bg-light">
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-header bg-primary text-white p-4 position-relative">
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 opacity-25"
                  style={{
                    background:
                      "url('https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1000') center/cover",
                  }}
                ></div>
                <div className="position-relative z-index-1 text-center">
                  <h2 className="fw-bold mb-1">Welcome Back</h2>
                  <p className="mb-0">Sign in to your ArtVenture account</p>
                </div>
              </div>

              <div className="card-body p-4 p-sm-5">
                {error && (
                  <div className="alert alert-danger rounded-3">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
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
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-lock-fill text-muted"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="text-end mt-2">
                      <Link
                        to="/forgot-password"
                        className="text-decoration-none small text-muted"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 rounded-3 fw-bold py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="mb-0 text-muted">
                    Don't have an account?{" "}
                    <Link to="/Register" className="text-decoration-none fw-semibold">
                      Create one
                    </Link>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-top">
                  <p className="text-center text-muted mb-3">Or sign in with</p>
                  <div className="d-flex justify-content-center gap-3">
                    <button type="button" className="btn btn-outline-primary rounded-circle p-2">
                      <i className="bi bi-google fs-5"></i>
                    </button>
                    <button type="button" className="btn btn-outline-primary rounded-circle p-2">
                      <i className="bi bi-facebook fs-5"></i>
                    </button>
                    <button type="button" className="btn btn-outline-primary rounded-circle p-2">
                      <i className="bi bi-twitter fs-5"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
