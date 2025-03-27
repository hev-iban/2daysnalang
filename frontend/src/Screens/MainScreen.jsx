import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/MainScreen.css"; // Import the new CSS file

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
        setFilteredArts(
            query.trim() === ""
                ? arts
                : arts.filter((art) =>
                      art.name.toLowerCase().includes(query.toLowerCase())
                  )
        );
    };

    return (
        <div className="main-container">
            <h2 className="welcome-text">Welcome, {user?.username}!</h2>
            <p className="subtitle">Browse through the available artworks.</p>

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search artworks..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <h3 className="section-title">Uploaded Artworks</h3>

            {/* Art Grid */}
            <div className="art-grid">
                {filteredArts.length > 0 ? (
                    filteredArts.map((art) => (
                        <Link to={`/art/${art.uuid}`} key={art.uuid} className="art-card">
                            <div className="art-image">
                                <img
                                    src={art.image ? `${API_URL}${art.image}` : "/placeholder.jpg"}
                                    alt={art.name}
                                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                                />
                            </div>
                            <div className="art-details">
                                <h2>{art.name}</h2>
                                <p className="description">{art.description}</p>
                                <p className="price">Starting Price: ${art.start_price}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="no-artworks">No artworks found.</p>
                )}
            </div>
        </div>
    );
};

export default MainScreen;
