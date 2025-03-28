import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ArtBidding.css"; // Import CSS

const API_URL = "http://127.0.0.1:8000";

const ArtBidding = () => {
  const [arts, setArts] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const token = localStorage.getItem("token") || "";
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    fetchArts();
  }, []);

  const fetchArts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/arts/`);
      setArts(response.data);
    } catch (error) {
      console.error("Error fetching artworks", error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in to upload art.");
      return;
    }

    const formData = new FormData(e.target);
    try {
      await axios.post(`${API_URL}/api/upload-art/`, formData, {
        headers: { Authorization: `Token ${token}` },
      });
      alert("Artwork uploaded successfully!");
      fetchArts();
    } catch (error) {
      alert("Upload failed. Please try again.");
      console.error(error);
    }
  };

  const handleBid = async (artUuid) => {
    if (!token) {
      alert("You must be logged in to place a bid.");
      return;
    }
    if (!bidAmount || bidAmount <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/arts/${artUuid}/bid/`,
        { bid_amount: bidAmount },
        { headers: { Authorization: `Token ${token}` } }
      );
      alert("Bid placed successfully!");
      fetchArts();
    } catch (error) {
      alert("Failed to place bid. Please try again.");
      console.error(error);
    }
  };

  // Filter artworks based on search query
  const filteredArts = arts.filter(
    (art) =>
      art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(art.start_price).includes(searchQuery)
  );

  return (
    <div className="bidding-container">
      <h1 className="page-title">Art Bidding Platform</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, price, or artist..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h3 className="section-title">Available Artworks</h3>
      <div className="art-grid">
        {filteredArts.length > 0 ? (
          filteredArts.map((art) => (
            <div key={art.uuid} className="art-card" onClick={() => navigate(`/art/${art.uuid}`)}>
              <img
                src={art.image ? `${API_URL}${art.image}` : "placeholder.jpg"}
                alt={art.name}
                className="art-image"
                onError={(e) => (e.target.src = "placeholder.jpg")}
              />
              <h2 className="art-name">{art.name}</h2>
              <p className="art-artist">Artist: {art.artist}</p>
              <p className="art-price">Starting Price: ${art.start_price}</p>
              <button className="bid-button" onClick={(e) => { e.stopPropagation(); setSelectedArt(art); }}>
                Place Bid
              </button>
            </div>
          ))
        ) : (
          <p className="no-art">No artworks available for bidding.</p>
        )}
      </div>

      {/* Bidding Section */}
      {selectedArt && (
  <div className="bid-section">
    <h2 className="bid-title">Bidding on {selectedArt.name}</h2>
    <input
      type="number"
      value={bidAmount}
      onChange={(e) => setBidAmount(e.target.value)}
      placeholder="Enter bid amount"
      className="bid-input"
    />
    <div className="bid-buttons">
      <button className="submit-bid-button" onClick={() => handleBid(selectedArt.uuid)}>Submit Bid</button>
      <button className="cancel-bid-button" onClick={() => setSelectedArt(null)}>Cancel</button>
    </div>
  </div>
)}

      {/* Upload Art Section */}
      <div className="upload-container">
  <h2 className="upload-title">Upload New Artwork</h2>
  <form onSubmit={handleUpload} className="upload-form">
    <label className="upload-label">Artwork Name</label>
    <input type="text" name="name" placeholder="Enter artwork name" required className="upload-input" />

    <label className="upload-label">Description</label>
    <textarea name="description" placeholder="Write a short description..." className="upload-textarea"></textarea>

    <label className="upload-label">Starting Price ($)</label>
    <input type="number" name="start_price" placeholder="Enter starting price" required className="upload-input" />

    <label className="upload-label">Upload Image</label>
    <input type="file" name="image" className="upload-file" />

    <button type="submit" className="upload-button">Upload Artwork</button>
  </form>
</div>
    </div>
  );
};

export default ArtBidding;
