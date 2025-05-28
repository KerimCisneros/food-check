import React, { useState, useEffect } from "react";
import "../../models/css/ClockIn.css";

const ClockIn: React.FC = () => {
    const [sso, setSso] = useState("");
    const [message, setMessage] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (sso === "223142259") {
                setMessage("Authenticated! Clock-in successful.");
                setAuthenticated(true);
            } else {
                setMessage("Invalid SSO. Please try again.");
                setAuthenticated(false);
            }
        } catch (error) {
            console.error("Error during clock-in:", error);
            setMessage("An error occurred. Please try again later.");
            setAuthenticated(true);
            throw error;
        }
    };
    // This refreshes the page after 5 seconds if authenticated or error occurs
    useEffect(() => {
        if (authenticated) {
            const timer = setTimeout(() => {
                window.location.reload();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [authenticated]);

    return (
        <div className="clockin-container">
            <h2>Clock-in Service</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your SSO"
                    value={sso}
                    onChange={(e) => setSso(e.target.value)}
                    className="clockin-input"
                />
                <button type="submit" className="clockin-btn">Clock In</button>
            </form>
            {message && <p className="clockin-message">{message}</p>}
        </div>
    );
};

export default ClockIn;