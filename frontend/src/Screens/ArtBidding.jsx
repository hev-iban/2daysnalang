import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const ArtBidding = () => {
  const [arts, setArts] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    fetchArts();
  }, []);

  const fetchArts = async () => {
    try {
      const response = await axios.get(`${API_URL}/arts/`);
      setArts(response.data);
    } catch (error) {
      console.error("Error fetching artworks", error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await axios.post(`${API_URL}/upload-art/`, formData, {
        headers: { Authorization: `Token ${token}` },
      });
      alert("Artwork uploaded!");
      fetchArts();
    } catch (error) {
      alert("Upload failed");
      console.error(error);
    }
  };

  const handleBid = async (artId) => {
    try {
      await axios.post(
        `${API_URL}/arts/${artId}/bid/`,
        { bid_amount: bidAmount },
        { headers: { Authorization: `Token ${token}` } }
      );
      alert("Bid placed successfully!");
      fetchArts();
    } catch (error) {
      alert("Failed to place bid");
      console.error(error);
    }
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold">Art Bidding Platform</h1>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {arts.map((art) => (
          <div key={art._id} className="border p-4 rounded-lg shadow">
            <img
              src={art.image || "placeholder.jpg"}
              alt={art.name}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-lg font-semibold mt-2">{art.name}</h2>
            <p className="text-gray-600">{art.description}</p>
            <p className="font-bold">Starting Price: ${art.start_price}</p>
            <button
              onClick={() => setSelectedArt(art)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Place Bid
            </button>
          </div>
        ))}
      </div>

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
            onClick={() => handleBid(selectedArt._id)}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit Bid
          </button>
        </div>
      )}

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
