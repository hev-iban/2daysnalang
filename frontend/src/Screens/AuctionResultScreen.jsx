import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuctionResultScreen.css";

const API_URL = "http://127.0.0.1:8000";

const AuctionResultScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [auctionResult, setAuctionResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuctionResult = async () => {
            try {
                // ❌ Dummy data for now (Replace with actual API call later)
                const dummyData = {
                    winner: "JohnDoe",
                    winningBid: 250,
                    status: "Closed",
                    endTime: "2025-03-28T18:30:00Z"
                };

                // ✅ Uncomment below when backend is ready
                // const response = await axios.get(`${API_URL}/api/auctions/${id}/result/`);
                // setAuctionResult(response.data);

                setAuctionResult(dummyData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching auction result", error);
                setError("Failed to load auction results.");
                setLoading(false);
            }
        };

        fetchAuctionResult();
    }, [id]);

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

    return (
        <div className="auction-result-container">
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
            <h2 className="result-title">Auction Results</h2>

            <div className="result-details">
                <p><strong>Winner:</strong> {auctionResult?.winner}</p>
                <p><strong>Winning Bid:</strong> ${auctionResult?.winningBid}</p>
                <p><strong>Status:</strong> {auctionResult?.status}</p>
                <p><strong>End Time:</strong> {new Date(auctionResult?.endTime).toLocaleString()}</p>
            </div>

            {/* Proceed to Payment Button */}
            <div className="payment-section">
                <button 
                    className="payment-button" 
                    onClick={() => navigate(`/payment/${id}`)}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default AuctionResultScreen;
