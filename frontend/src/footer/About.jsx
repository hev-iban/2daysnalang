import React from "react";
import "../styles/global.css"; // Ensure this file contains the .page-container class

const About = () => {
  return (
    <div className="page-container">
      <h1>We are ArtBid</h1>
      <p>
        An online platform for discovering, bidding, buying, and selling art. 
        We aim to connect artists and art lovers from around the world.
      </p>
    </div>
  );
};

export default About;