import { useState } from "react";
import "../styles/ProfileScreen.css"; // Custom CSS for styling

const ProfileScreen = () => {
    const [username, setUsername] = useState("JohnDoe");
    const [email, setEmail] = useState("johndoe@example.com");
    const [description, setDescription] = useState("This is a short bio about me.");

    const handleUpdateProfile = () => {
        alert("Profile updated successfully!");
    };

    return (
        <div className="profile-container">
            <h2 className="profile-title">My Profile</h2>

            <div className="profile-info">
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="profile-input"
                />
            </div>

            <div className="profile-info">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="profile-input"
                />
            </div>

            <div className="profile-info">
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="profile-textarea"
                />
            </div>

            <button className="profile-button" onClick={handleUpdateProfile}>
                Update Profile
            </button>
        </div>
    );
};

export default ProfileScreen;
