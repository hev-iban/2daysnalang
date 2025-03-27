import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
            fetchBids(); // Fetch bids after fetching art
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
            console.log("Fetched Bids:", response.data); // Debugging
            setBids(response.data); // Ensure bid data includes user and timestamp
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
            fetchArt(); // Refresh artwork and bids
        } catch (error) {
            alert("Failed to place bid. Please try again.");
            console.error(error);
        }
    };

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <button
                className="mb-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <h2 className="text-3xl font-bold">{art.name}</h2>

            <img
                src={art.image ? `${API_URL}${art.image}` : "placeholder.jpg"}
                alt={art.name}
                className="w-full h-96 object-cover rounded-lg my-4"
                onError={(e) => (e.target.src = "placeholder.jpg")}
            />

            <p className="text-gray-600">{art.description}</p>
            <p className="font-bold mt-2">
                Current Price: ${bids.length > 0 ? bids[0].amount : art.start_price}
            </p>

            {/* Bidding Section */}
            <div className="mt-6 p-4 border rounded-lg">
                <h3 className="text-xl font-semibold">Place a Bid</h3>
                <input
                    type="number"
                    placeholder="Enter bid amount"
                    className="mt-2 p-2 w-full border rounded-lg"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                />
                <button
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={handleBid}
                >
                    Submit Bid
                </button>
            </div>

            {/* Bid History */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold">Bid History</h3>
                {bids.length > 0 ? (
                    <ul className="mt-2 border rounded-lg p-4">
                        {bids.map((bid, index) => (
                            <li key={index} className="border-b py-2">
                                <strong>{bid?.user?.username || "Unknown User"}</strong>: 
                                <span className="text-green-600 font-bold"> ${bid.amount}</span>
                                <br />
                                <span className="text-gray-500 text-sm">
                                    {bid.timestamp
                                        ? new Date(bid.timestamp).toLocaleString()
                                        : "No Timestamp"}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No bids placed yet.</p>
                )}
            </div>
        </div>
    );
};

export default ArtDetail;
