import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainScreen = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [arts, setArts] = useState([]);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in first.');
            navigate('/login');
        } else {
            // Fetch user data (if stored)
            const storedUser = JSON.parse(localStorage.getItem('user')) || { username: 'Guest' };
            setUser(storedUser);
        }
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch("http://127.0.0.1:8000/api/arts/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}` // Include authentication token
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Unauthorized: Please log in again.");
            }
            return response.json();
        })
        .then((data) => setArts(data))
        .catch((error) => {
            console.error("Error fetching arts:", error);
            alert("Session expired. Please log in again.");
            navigate('/login'); // Redirect if unauthorized
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token
        localStorage.removeItem('user'); // Remove stored user
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            <h2>Welcome, {user?.username}!</h2>
            <p>You are now on the Main Screen.</p>
            <button onClick={handleLogout}>Logout</button>

            <h1>Art Listings</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {arts.length > 0 ? (
                    arts.map((art) => (
                        <div key={art.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", width: "250px" }}>
                            <img
                                src={`http://127.0.0.1:8000${art.image}`} // Ensure backend serves images correctly
                                alt={art.name}
                                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }}
                            />
                            <h3>{art.name}</h3>
                            <p>{art.description}</p>
                            <p><strong>Starting Price:</strong> ${art.start_price}</p>
                            {art.fixed_price && <p><strong>Fixed Price:</strong> ${art.fixed_price}</p>}
                        </div>
                    ))
                ) : (
                    <p>No artworks available.</p>
                )}
            </div>
        </div>
    );
};

export default MainScreen;
