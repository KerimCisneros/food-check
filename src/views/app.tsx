import React, { useState, useEffect, useRef } from "react";
import LunchPunchFunction from "../services/lunchpunch/ts/lunchPunchService";
import type { LunchPunchRespose } from "../models/lunchPunchService/interfaces";
import "../models/css/ClockIn.css";

const ClockIn: React.FC = () => {
    const [sso, setSso] = useState<number>();
    const [message, setMessage] = useState<string>("");
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const successRef = useRef(new Audio('/Success.mp3'));
    const failRef = useRef(new Audio('/failure.mp3'));

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const PunchData: LunchPunchRespose = await LunchPunchFunction(sso || 0);
            if (PunchData.Access === true) {
                successRef.current.play();
                setMessage(`Provecho, ${PunchData.UserName}`);
                setAuthenticated(true);
            } else {
                failRef.current.play();
                setMessage("Invalid SSO. Please try again.");
                if (inputRef.current) {
                    inputRef.current.value = '';
                    inputRef.current.focus();
                };
            };
        } catch (error) {
            console.error("Error during clock-in:", error);
            setMessage("An error occurred. Please try again later.");
            // setAuthenticated(true);
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
        if (inputRef.current) {
            inputRef.current.focus();
        };
    }, [authenticated]);

    return (
        <div className="clockin-container">
            <h2>Clock-in Service</h2>
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    id="ssoinput"
                    onKeyDown={(event) => {
                        if (
                            event.key !== 'Backspace' &&
                            event.key !== 'Delete' &&
                            event.key !== 'ArrowLeft' &&
                            event.key !== 'ArrowRight' &&
                            event.key !== 'ArrowUp' &&
                            event.key !== 'ArrowDown' &&
                            event.key !== 'Tab' &&
                            event.key !== 'Shift' &&
                            event.key !== 'Enter' &&
                            !/^[0-9]$/.test(event.key) // Only allow digits
                        ) {
                            event.preventDefault();
                        } ``
                    }}
                    placeholder="Enter your SSO"
                    maxLength={9}
                    className="clockin-input"
                />
                <button type="submit" className="clockin-btn" onClick={() => {
                    const num = document.getElementById('ssoinput') as HTMLInputElement;
                    setSso((num === null ? 0 : Number(num.value)));
                }}>Clock In</button>
            </form>
            {message && <p className="clockin-message">{message}</p>}
        </div>
    );
};

export default ClockIn;