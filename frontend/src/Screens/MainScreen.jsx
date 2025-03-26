import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const MainScreen = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [arts, setArts] = useState([]); // Store artworks

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in first.");
            navigate("/login");
        } else {
            const storedUser = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };
            setUser(storedUser);
            fetchArts();
        }
    }, [navigate]);

    const fetchArts = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/arts/`);
            setArts(response.data);
        } catch (error) {
            console.error("Error fetching artworks", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="container p-4">
            <h2 className="text-2xl font-bold">Welcome, {user?.username}!</h2>
            <p>You are now on the Main Screen.</p>
            <button onClick={handleLogout} className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                Logout
            </button>

            <h3 className="text-xl font-semibold mt-6">Uploaded Artworks</h3>
            <div className="mt-4 grid grid-cols-3 gap-4">
                {arts.length > 0 ? (
                    arts.map((art) => (
                        <div key={art.uuid} className="border p-4 rounded-lg shadow">
                            <img
                                src={art.image ? `${API_URL}${art.image}` : "placeholder.jpg"}
                                alt={art.name}
                                className="w-full h-48 object-cover"
                                onError={(e) => (e.target.src = "placeholder.jpg")} // Fallback for broken images
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
