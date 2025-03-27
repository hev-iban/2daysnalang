const FAQs = () => {
  return (
    <div className="page-container">
      <h1>We are ArtBid</h1>
      <p>
        An online platform for discovering, bidding, buying, and selling art. 
        We aim to connect artists and art lovers from around the world.
      </p>

      <h2>Frequently Asked Questions</h2>

      <div className="faq-section">
        <h3>1. What is ArtBid?</h3>
        <p>ArtBid is an online art auction platform where collectors, artists, and buyers can bid on unique artworks in real-time.</p>

        <h3>2. How do I create an account?</h3>
        <p>Click on the <strong>Register</strong> button and fill in your details. You will receive a confirmation email to activate your account.</p>

        <h3>3. How does the bidding process work?</h3>
        <p>
          1. Find an artwork you like. <br />
          2. Place a bid that is <strong>equal to or higher</strong> than the current bid. <br />
          3. If no one outbids you before the auction ends, you win!
        </p>

        <h3>4. Is there a fee for placing a bid?</h3>
        <p>No, bidding is free! However, if you win an auction, you must complete the payment for the artwork.</p>

        <h3>5. How do I know if I won an auction?</h3>
        <p>If you win an auction, you will receive an confirmation, and the artwork will appear in your <strong>"My Bids"</strong> section.</p>

        <h3>6. What payment methods do you accept?</h3>
        <p>We accept <strong>PayPal</strong>. Secure payment processing is ensured.</p>

        <h3>7. Can I sell my artwork on ArtBid?</h3>
        <p>Yes! If you're an artist or collector, you can list your artwork by uploading your art.</p>

        <h3>8. How are artworks shipped to buyers?</h3>
        <p>Once the auction ends and payment is confirmed, the seller arranges for secure shipping. You will receive tracking details.</p>

        <h3>9. What happens if I want to cancel my bid?</h3>
        <p>Once a bid is placed, it <strong>cannot be canceled</strong> unless under exceptional circumstances. Contact support if you need assistance.</p>

        <h3>10. Is there a buyer protection policy?</h3>
        <p>Yes! ArtBid ensures that all transactions are secure. If you receive a damaged or incorrect item, you may be eligible for a refund.</p>

        <h3>11. How do I contact support?</h3>
        <p>For assistance, visit our <strong>Help Center</strong> or email us at <a href="mailto:support@artbid.com">support@artbid.com</a>.</p>
      </div>
    </div>
  );
};

export default FAQs;
