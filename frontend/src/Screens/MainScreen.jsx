import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const MainScreen = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [arts, setArts] = useState([]); // Store all artworks
    const [searchQuery, setSearchQuery] = useState(""); // Search input
    const [filteredArts, setFilteredArts] = useState([]); // Filtered results

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
            setFilteredArts(response.data); // Initialize filteredArts with all artworks
        } catch (error) {
            console.error("Error fetching artworks", error);
        }
    };

    // Handle search query changes
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter artworks based on search query
        if (query.trim() === "") {
            setFilteredArts(arts);
        } else {
            setFilteredArts(
                arts.filter((art) =>
                    art.name.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    };

    return (
        <div className="container p-4">
            <h2 className="text-2xl font-bold">Welcome, {user?.username}!</h2>
            <p>You are now on the Main Screen.</p>

            {/* Search Bar */}
            <div className="mt-4 mb-6">
                <input
                    type="text"
                    placeholder="Search artworks..."
                    className="p-2 w-full border rounded-lg"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <h3 className="text-xl font-semibold mt-4">Uploaded Artworks</h3>
            <div className="mt-4 grid grid-cols-3 gap-4">
                {filteredArts.length > 0 ? (
                    filteredArts.map((art) => (
                        <div key={art.uuid} className="border p-4 rounded-lg shadow">
                            <img
                                src={art.image ? `${API_URL}${art.image}` : "placeholder.jpg"}
                                alt={art.name}
                                className="w-full h-48 object-cover"
                                onError={(e) => (e.target.src = "placeholder.jpg")}
                            />
                            <h2 className="text-lg font-semibold mt-2">{art.name}</h2>
                            <p className="text-gray-600">{art.description}</p>
                            <p className="font-bold">Starting Price: ${art.start_price}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No artworks found.</p>
                )}
            </div>
        </div>
    );
};

export default MainScreen;
