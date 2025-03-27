import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

const MainScreen = () => {
    const [user, setUser] = useState(null);
    const [arts, setArts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredArts, setFilteredArts] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };
        setUser(storedUser);
        fetchArts();
    }, []);

    const fetchArts = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/arts/`);
            setArts(response.data);
            setFilteredArts(response.data);
        } catch (error) {
            console.error("Error fetching artworks", error);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

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
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold">Welcome, {user?.username}!</h2>
            <p className="text-gray-600">Browse through the available artworks.</p>

            {/* Search Bar */}
            <div className="mt-4 mb-6">
                <input
                    type="text"
                    placeholder="Search artworks..."
                    className="p-3 w-full border rounded-lg shadow-sm"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <h3 className="text-2xl font-semibold mt-4">Uploaded Artworks</h3>

            {/* Art Cards Grid (6 cards per row) */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {filteredArts.length > 0 ? (
                    filteredArts.map((art) => (
                        <Link 
                            to={`/art/${art.uuid}`} 
                            key={art.uuid} 
                            className="block border rounded-lg shadow-lg bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                            style={{ width: "100%", height: "350px" }} // Fixed card height
                        >
                            {/* Image Container */}
                            <div className="w-full h-2/3 overflow-hidden rounded-t-lg">
                                <img
                                    src={art.image ? `${API_URL}${art.image}` : "placeholder.jpg"}
                                    alt={art.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => (e.target.src = "placeholder.jpg")}
                                />
                            </div>

                            {/* Card Content */}
                            <div className="p-4 h-1/3 flex flex-col justify-between">
                                <h2 className="text-lg font-semibold truncate">{art.name}</h2>
                                <p className="text-gray-500 text-sm truncate">{art.description}</p>
                                <p className="font-bold text-blue-600 mt-2">Starting Price: ${art.start_price}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-500">No artworks found.</p>
                )}
            </div>
        </div>
    );
};

export default MainScreen;
