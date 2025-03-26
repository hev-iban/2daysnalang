import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const MainScreen = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [arts, setArts] = useState([]); // Store artworks

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in first.");
            navigate("/login");
        } else {
            // Fetch user data (if stored) or set dummy user data
            const storedUser = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };
            setUser(storedUser);
            fetchArts(); // Fetch artworks
        }
    }, [navigate]);

    const fetchArts = async () => {
        try {
            const response = await axios.get(`${API_URL}/arts/`);
            setArts(response.data); // Store fetched artworks
        } catch (error) {
            console.error("Error fetching artworks", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        localStorage.removeItem("user"); // Remove stored user
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="container p-4">
            <h2 className="text-2xl font-bold">Welcome, {user?.username}!</h2>
            <p>You are now on the Main Screen.</p>
            <button onClick={handleLogout} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
                Logout
            </button>

            <h3 className="text-xl font-semibold mt-6">Uploaded Artworks</h3>
            <div className="mt-4 grid grid-cols-3 gap-4">
                {arts.length > 0 ? (
                    arts.map((art) => (
                        <div key={art.uuid} className="border p-4 rounded-lg shadow">
                            <img
                                src={art.image || "placeholder.jpg"}
                                alt={art.name}
                                className="w-full h-48 object-cover"
                            />
                            <h2 className="text-lg font-semibold mt-2">{art.name}</h2>
                            <p className="text-gray-600">{art.description}</p>
                            <p className="font-bold">Starting Price: ${art.start_price}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No artworks uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default MainScreen;
