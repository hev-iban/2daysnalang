import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const ArtBidding = () => {
  const [arts, setArts] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="container p-4">
      <h1 className="text-2xl font-bold">Art Bidding Platform</h1>

      {/* Search Bar */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search by name, price, or artist..."
          className="border p-2 rounded w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h3 className="text-xl font-semibold mt-6">Available Artworks</h3>
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
              <p className="text-gray-500">Artist: {art.artist}</p>
              <p className="font-bold">Starting Price: ${art.start_price}</p>
              <button
                onClick={() => setSelectedArt(art)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Place Bid
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No artworks available for bidding.</p>
        )}
      </div>

      {/* Bidding Section */}
      {selectedArt && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-lg font-bold">Bidding on {selectedArt.name}</h2>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            placeholder="Enter bid amount"
            className="border p-2 rounded w-full mt-2"
          />
          <button
            onClick={() => handleBid(selectedArt.uuid)}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
            disabled={!bidAmount || bidAmount <= 0}
          >
            Submit Bid
          </button>
          <button
            onClick={() => setSelectedArt(null)}
            className="mt-2 bg-gray-400 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Upload Art Section */}
      <form onSubmit={handleUpload} className="mt-6 p-4 border rounded">
        <h2 className="text-lg font-bold">Upload New Art</h2>
        <input type="text" name="name" placeholder="Art Name" className="border p-2 rounded w-full mt-2" required />
        <textarea name="description" placeholder="Description" className="border p-2 rounded w-full mt-2"></textarea>
        <input type="number" name="start_price" placeholder="Starting Price" className="border p-2 rounded w-full mt-2" required />
        <input type="file" name="image" className="border p-2 rounded w-full mt-2" />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
      </form>
    </div>
  );
};

export default ArtBidding;
