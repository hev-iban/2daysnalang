import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ArtDetail.css";



const API_URL = "http://127.0.0.1:8000";

const ArtDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [art, setArt] = useState(null);
    const [bids, setBids] = useState([]);
    const [bidAmount, setBidAmount] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        fetchArt();
    }, [id]);

    const fetchArt = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/arts/${id}/`);
            setArt(response.data);
            fetchBids();
            setLoading(false);
        } catch (error) {
            console.error("Error fetching art details", error);
            setError("Failed to load artwork details.");
            setLoading(false);
        }
    };

    const fetchBids = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/arts/${id}/bids/`);
            setBids(response.data);
        } catch (error) {
            console.error("Error fetching bids", error);
        }
    };

    const handleBid = async () => {
        if (!token) {
            alert("You must be logged in to place a bid.");
            return;
        }

        const highestBid = bids.length > 0 ? bids[0].amount : art.start_price;
        if (parseFloat(bidAmount) <= highestBid) {
            alert("Your bid must be higher than the current highest bid.");
            return;
        }

        try {
            await axios.post(
                `${API_URL}/api/arts/${id}/bid/`,
                { bid_amount: parseFloat(bidAmount) },
                { headers: { Authorization: `Token ${token}` } }
            );

            alert("Bid placed successfully!");
            setBidAmount("");
            fetchArt();
        } catch (error) {
            alert("Failed to place bid. Please try again.");
            console.error(error);
        }
    };

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

    return (
        <div className="art-detail-container">
    {/* Back Button */}
    <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

    {/* Artwork Title */}
    <h2 className="art-title">{art.name}</h2>

    {/* Artwork Image */}
    <div className="art-image-container">
        <img
            src={art.image ? `${API_URL}${art.image}` : "placeholder.jpg"}
            alt={art.name}
            className="art-image"
            onError={(e) => (e.target.src = "placeholder.jpg")}
        />
    </div>

    {/* Artwork Description */}
    <p className="art-description">{art.description}</p>
    <p className="current-price">
        Current Price: ${bids.length > 0 ? bids[0].amount : art.start_price}
    </p>

    {/* Bidding Section */}
    <div className="bid-section">
        <h3>Place a Bid</h3>
        <div className="bid-input-container">
            <input
                type="number"
                placeholder="Enter bid amount"
                className="bid-input"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
            />
            <button className="bid-button" onClick={handleBid}>Submit Bid</button>
        </div>
    </div>

    {/* Bid History */}
    <div className="bid-history">
        <h3>Bid History</h3>
        {bids.length > 0 ? (
            <ul className="bid-list">
                {bids.map((bid, index) => (
                    <li key={index} className="bid-item">
                        <div>
                            <span className="bid-user">{bid?.user?.username || "Unknown User"}</span> 
                            <span className="bid-amount"> ${bid.amount}</span>
                            <br />
                            <span className="bid-timestamp">
                                {bid.timestamp ? new Date(bid.timestamp).toLocaleString() : "No Timestamp"}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-gray-500 mt-3">No bids placed yet.</p>
        )}
    </div>
        </div>
    );
};

export default ArtDetail;
