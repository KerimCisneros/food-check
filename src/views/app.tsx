import React, { useState, useEffect } from "react";
import LunchPunchFunction from "../services/lunchpunch/ts/lunchPunchService";
import type { LunchPunchRespose } from "../models/lunchPunchService/interfaces";
import "../models/css/ClockIn.css";

const ClockIn: React.FC = () => {
    const [sso, setSso] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const PunchData: LunchPunchRespose = await LunchPunchFunction(sso);
        try {
            console.log(PunchData)
            if (PunchData.Access === true) {
                setMessage(`Provecho, ${PunchData.UserName}`);
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
                    onKeyDown={(event) => {
                        // Allow navigation keys (backspace, delete, arrows, etc.)
                        if (
                            event.key !== 'Backspace' &&
                            event.key !== 'Delete' &&
                            event.key !== 'ArrowLeft' &&
                            event.key !== 'ArrowRight' &&
                            event.key !== 'ArrowUp' &&
                            event.key !== 'ArrowDown' &&
                            event.key !== 'Tab' &&
                            event.key !== 'Shift' &&
                            !/^[0-9]$/.test(event.key) // Only allow digits
                        ) {
                            event.preventDefault();
                        } ``
                    }}
                    placeholder="Enter your SSO"
                    maxLength={9}
                    onChange={(e) => setSso(Number(e.target.value))}
                    className="clockin-input"
                />
                <button type="submit" className="clockin-btn">Clock In</button>
            </form>
            {message && <p className="clockin-message">{message}</p>}
        </div>
    );
};

export default ClockIn;