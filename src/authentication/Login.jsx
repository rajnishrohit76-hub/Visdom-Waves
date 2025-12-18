// src/Login.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
// The original file used "./Login.css", but the enhanced one uses "./index.css". 
// Assuming "./index.css" is the correct one for the current structure.
import './Login.css';
import bgVideo from "/Login Background/Video.mp4"; 
import { Link } from "react-router-dom";

// ---------------------------
// Custom Hooks and Helpers
// ---------------------------

// Helper function for Mobile Number Validation (Simple 10-digit number)
const validateMobile = (mobile) => {
    return /^\d{10}$/.test(mobile); 
};

// Custom Hook for Toast Notifications
const useToast = () => {
    const [toast, setToast] = useState(null);
    
    const showToast = useCallback((message, type = 'info', duration = 3000) => {
        // Clear existing toast if present
        setToast(null); 
        setToast({ message, type });
        const timer = setTimeout(() => setToast(null), duration);
        return () => clearTimeout(timer);
    }, []);

    return [toast, showToast];
};

// Toast Component (Rendered at the top level)
const Toast = ({ toast }) => {
    if (!toast) return null;
    // FIX 1: Corrected template literal string in className: `toast toast-${toast.type}`
    return (
        <div className={`toast toast-${toast.type}`}> 
            {toast.message}
        </div>
    );
};


function Login() {
    // ---------------------------
    // 1. State Management
    // ---------------------------
    const [darkMode, setDarkMode] = useState(() => {
        try {
            // Read dark mode preference from localStorage
            return localStorage.getItem("visdom:dark") === "true";
        } catch {
            return false;
        }
    });

    const [activeTab, setActiveTab] = useState("login"); 
    const [mobile, setMobile] = useState("");
    const isMobileValid = validateMobile(mobile); // Validation check
    
    const [isTypingPin, setIsTypingPin] = useState(false);
    const [pinDigits, setPinDigits] = useState([]);
    const PIN_LENGTH = 4;

    const [cameraError, setCameraError] = useState(null);
    const [micError, setMicError] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [voiceSubmitted, setVoiceSubmitted] = useState(false);
    const [faceCaptured, setFaceCaptured] = useState(false);

    const [toast, showToast] = useToast();

    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const micStreamRef = useRef(null);
    const camStreamRef = useRef(null);
    const speakTimeoutRef = useRef(null);
    const mobileSpeakTimeout = useRef(null);

    // Panda covers eyes only during PIN entry
    const pandaCover = activeTab === "pin" && pinDigits.length > 0;
    const isFlipped = activeTab === "face"; 

    // ---------------------------
    // 3. Helper Functions (Speech)
    // ---------------------------

    const speak = useCallback((text, opts = {}) => {
        try {
            if (typeof window === "undefined" || !window.speechSynthesis) return;
            window.speechSynthesis.cancel(); 
            
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = opts.lang || "en-US";
            utter.rate = opts.rate ?? 1;
            utter.pitch = opts.pitch ?? 1.05;
            utter.volume = opts.volume ?? 1;
            window.speechSynthesis.speak(utter);
        } catch (e) {
            console.warn("Speech synthesis error:", e);
        }
    }, []); 

    const debounceSpeak = useCallback((text, delay = 500) => {
        if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);
        speakTimeoutRef.current = setTimeout(() => speak(text), delay);
    }, [speak]);


    // ---------------------------
    // 4. Media Logic (Cam/Mic) 
    // ---------------------------
    
    const stopCamera = useCallback(() => {
        if (camStreamRef.current) {
            camStreamRef.current.getTracks().forEach((t) => t.stop());
            camStreamRef.current = null;
        }
        if (videoRef.current) videoRef.current.srcObject = null;
        setCameraError(null); 
        setFaceCaptured(false);
    }, []); 

    const startCamera = useCallback(async () => {
        if (!isMobileValid) {
            showToast("Enter a valid mobile number before starting Face ID.", "warning");
            setActiveTab("login");
            return;
        }
        setCameraError(null);
        setFaceCaptured(false);
        try {
            // Request video stream
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            camStreamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            showToast("Camera stream started. Look into the camera.", "info");
        } catch (err) {
            console.error(err);
            setCameraError("Camera access denied. Check permissions.");
            showToast("Camera access denied.", "error");
            speak("I cannot see the camera.");
        }
    }, [speak, showToast, isMobileValid]); 

    const stopMic = useCallback(() => {
        if (micStreamRef.current) {
            micStreamRef.current.getTracks().forEach((t) => t.stop());
            micStreamRef.current = null;
        }
        if (audioRef.current) audioRef.current.srcObject = null;
        setIsRecording(false); 
        setMicError(null);
    }, []); 

    const startMic = useCallback(async () => {
        if (!isMobileValid) {
            showToast("Enter a valid mobile number before starting Voice ID.", "warning");
            setActiveTab("login");
            return;
        }
        setMicError(null);
        setVoiceSubmitted(false);
        try {
            // Request audio stream
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            micStreamRef.current = stream;
            if (audioRef.current) {
                audioRef.current.srcObject = stream;
                // Attempt to play/monitor audio (often prevented by browsers, but useful for visualizers)
                audioRef.current.play().catch((e) => console.log("Audio play prevented:", e));
            }
            setIsRecording(true);
            showToast("Recording started. Speak your pass phrase.", "info");
        } catch (err) {
            console.error(err);
            setMicError("Mic access denied. Check permissions.");
            showToast("Mic access denied.", "error");
            speak("I cannot hear the microphone.");
        }
    }, [speak, showToast, isMobileValid]); 
    
    // Custom action buttons for media modes
    const handleFaceCapture = () => {
        if (!camStreamRef.current) {
            showToast("Camera stream not active.", "error");
            return;
        }
        if (!isMobileValid) {
            showToast("Enter a valid mobile number before verifying.", "warning");
            return;
        }
        
        setFaceCaptured(true);
        showToast("Face captured. Initiating verification...", "success");
        speak("Face captured. Verifying.");
        
        // Simulate verification delay
        setTimeout(() => {
            // Successful simulation
            // FIX 2: Corrected template literal string in alert
            alert(`Face ID Success for ${mobile}! (Simulated)`);
            showToast("Face ID successful!", "success");
            stopCamera();
            setActiveTab("login");
        }, 1500);
    };

    const handleVoiceSubmit = () => {
        if (!isMobileValid) {
            showToast("Enter a valid mobile number before submitting.", "warning");
            return;
        }
        stopMic(); // Stop recording stream
        setVoiceSubmitted(true);
        showToast("Voice recording submitted. Initiating verification...", "success");
        speak("Voice recording submitted. Verifying.");
        
        // Simulate verification delay
        setTimeout(() => {
            // Successful simulation
            // FIX 3: Corrected template literal string in alert
            alert(`Voice ID Success for ${mobile}! (Simulated)`);
            showToast("Voice ID successful!", "success");
            setActiveTab("login");
        }, 1500);
    };
    
    const handleGoBackToLogin = () => {
        stopCamera();
        stopMic();
        setActiveTab("login");
        showToast("Returned to standard login.", "info");
    };


    // ---------------------------
    // 2. Effects & Cleanup
    // ---------------------------
    useEffect(() => {
        // Apply dark mode class and save preference
        localStorage.setItem("visdom:dark", String(darkMode));
        document.body.classList.toggle("dark", darkMode);
    }, [darkMode]);

    // Cleanup effect (on unmount)
    useEffect(() => {
        return () => {
            stopCamera();
            stopMic();
            if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);
            if (mobileSpeakTimeout.current) clearTimeout(mobileSpeakTimeout.current);
            if (window.speechSynthesis) window.speechSynthesis.cancel();
        };
    }, [stopCamera, stopMic]);

    // Active tab effect (Logic inside setTimeout to prevent cascading renders)
    useEffect(() => {
        
        const timeoutId = setTimeout(() => {
            // 1. Cleanup old streams (includes state resets)
            stopCamera();
            stopMic();
            
            // 2. Setup new mode
            if (activeTab === "face") {
                // Only start if mobile is valid
                if (isMobileValid) {
                    startCamera();
                    speak("Face ID ready. Look into the camera.");
                } else {
                    showToast("Mobile number required for Face ID.", "warning");
                    setActiveTab("login"); // Fallback to login tab
                }
            } else if (activeTab === "voice") {
                if (isMobileValid) {
                    startMic();
                    speak("Switched to Voice ID. Press start to record your voice.");
                } else {
                    showToast("Mobile number required for Voice ID.", "warning");
                    setActiveTab("login"); // Fallback to login tab
                }
            } else if (activeTab === "pin") {
                setIsTypingPin(pinDigits.length > 0);
                speak("PIN login activated. Use the keypad.");
            } else {
                // Standard Login tab
                setIsTypingPin(false);
                setPinDigits([]);
                speak("Standard login selected.");
            }
        }, 100); // Slight delay for smoother state transitions

        return () => clearTimeout(timeoutId);
    }, [activeTab, stopCamera, stopMic, startCamera, startMic, pinDigits.length, setIsTypingPin, setPinDigits, speak, isMobileValid, showToast]); 


    // ---------------------------
    // 5. Input Logic
    // ---------------------------
    const onNumberPress = (digit) => {
        if (pinDigits.length >= PIN_LENGTH) return;
        
        setPinDigits((prev) => {
            const next = [...prev, String(digit)];
            if (next.length > 0) setIsTypingPin(true);
            
            debounceSpeak("I am not watching your password.", 300);
            
            if (next.length === PIN_LENGTH) {
                showToast("PIN entered. Submitting...", "info");
                setTimeout(() => onSubmitPin(next.join("")), 600);
            }
            return next;
        });
    };

    const onDelete = () => {
        setPinDigits((prev) => {
            const next = prev.slice(0, -1);
            if (next.length === 0) setIsTypingPin(false);
            speak("Deleted digit.");
            return next;
        });
    };

    const onClearPin = () => {
        setPinDigits([]);
        setIsTypingPin(false);
        speak("Cleared PIN.");
    };

    const onSubmitPin = (pinValue) => {
        if (!isMobileValid) {
            showToast("Enter a valid mobile number first!", "warning");
            onClearPin();
            return;
        }
        
        showToast("Authenticating PIN...", "info");
        speak("Submitting PIN.");
        
        setTimeout(() => {
            // Simulating server check (e.g., PIN 1234 is correct)
            if (pinValue === "1234") { 
                // FIX 4: Corrected template literal string in alert
                alert(`Success! Logged in as ${mobile}.`);
                showToast("Login successful!", "success");
            } else {
                alert("Error: Incorrect PIN. (Simulated)");
                showToast("Incorrect PIN. Please try again.", "error");
            }
            onClearPin();
            setActiveTab("login");
        }, 400);
    };

    function handleMobileChange(e) {
        // Only allow digits and limit to 10 characters
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
        setMobile(value);
        
        if (mobileSpeakTimeout.current) clearTimeout(mobileSpeakTimeout.current);
        mobileSpeakTimeout.current = setTimeout(() => {
            // FIX 5: Corrected template literal string in speak call
            if (value.length > 0 && value.length !== 10) speak(`Mobile number: ${value.length} digits.`);
            if (value.length === 10 && !validateMobile(value)) speak("Invalid number format. Check digits.");
        }, 800);
    }
    
    const handleNormalLogin = () => {
        if (!isMobileValid) {
            showToast("Please enter a valid 10-digit mobile number.", "warning");
            speak("Please enter a valid mobile number.");
            return;
        }
        showToast("Logging in with mobile number...", "info");
        speak("Normal login selected. Logging in.");
        // FIX 6: Corrected template literal string in alert
        alert(`Attempting login for mobile: ${mobile}`);
        // Simulate successful login
        setActiveTab("login");
    }


    // ---------------------------
    // 6. Helpers (Styling & Structure)
    // ---------------------------
    const renderPinCircles = () => {
        const circles = [];
        for (let i = 0; i < PIN_LENGTH; i++) {
            const filled = i < pinDigits.length;
            circles.push(
                // FIX 7: Corrected template literal string in className
                <div key={i} className={`pin-circle ${filled ? "filled" : ""}`}>
                    {filled ? "●" : ""}
                </div>
            );
        }
        return circles;
    };

    const numPad = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ["", 0, "DEL"],
    ];
    
    // Inline Styles for Modern Look (No CSS needed here, but keeping object structure for class attributes)
    // NOTE: All styling has been moved to index.css, using class names for number pad structure.

    // ---------------------------
    // 7. JSX
    // ---------------------------
    return (
      <>
        // FIX 8: Corrected template literal string in className
        <div className={`login-container ${darkMode ? "dark" : ""}`}>
            
            {/* Toast Notification System */}
            <Toast toast={toast} />

            {/* Background */}
            <div className="bgvideo" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', zIndex: -1 }}>
                <video autoPlay loop muted className="background-video" playsInline>
                    <source src={bgVideo} type="video/mp4" />
                </video>
            </div>

            {/* Top Bar */}
            <div className="top-bar">
                {/* <div className="logo-wrap">
                    <div className="logo-circle">VW</div>
                    <div className="logo-text">Visdom Waves</div>
                </div> */}
                {/* <div className="mode-toggle">
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={() => setDarkMode((s) => !s)}
                            aria-label="toggle dark mode"
                        />
                        <span className="slider" />
                    </label>
                    <span className="mode-label">{darkMode ? "🌙" : "☀"}</span>
                </div> */}
            </div>

            {/* Main Container */}
            {/* FIX 9: Corrected template literal string in className */}
            <div className={`login-box ${isFlipped ? "flip" : ""}`}>
                
                {/* LEFT: FULL BODY PANDA */}
                <div className="left-section">
                    {/* FIX 10: Corrected template literal string in className */}
                    <div className={`panda ${pandaCover ? "cover" : ""} ${isRecording ? "talk" : ""}`}>
                        
                        {/* Panda Art (Simplified for brevity) */}
                        <div className="ear ear-left" />
                        <div className="ear ear-right" />
                        <div className="body-group">
                            <div className="panda-body"><div className="belly"></div></div>
                            <div className="leg leg-left"><div className="foot-pad"></div></div>
                            <div className="leg leg-right"><div className="foot-pad"></div></div>
                        </div>
                        <div className="head">
                            <div className="face">
                                <div className="eye eye-left"><div className="pupil" /></div>
                                <div className="eye eye-right"><div className="pupil" /></div>
                                <div className="nose" />
                                <div className="mouth" />
                            </div>
                        </div>
                        <div className="arm arm-left"><div className="hand-pad" /></div>
                        <div className="arm arm-right"><div className="hand-pad" /></div>

                        {/* FIX 11: Corrected template literal string in className */}
                        <div className={`panda-bubble ${pandaCover || isRecording ? "visible" : ""}`}>
                            <span>
                                {pandaCover ? "I'm not watching..." : isRecording ? "Listening..." : "Hello!"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* RIGHT: INTERACTIVE CARD */}
                <div className="right-section">
                    <div className="card-inner">
                        
                        {/* --- FRONT: LOGIN / PIN / VOICE --- */}
                        <div className="card-face front">
                            <h2 className="rainbow-text">Visdom Waves Access</h2>
                            <div className="card-form">
                                
                                {/* Mobile Input */}
                                <label className="field-label">Mobile Number</label>
                                <input
                                    type="tel"
                                    // FIX 12: Corrected template literal string in className
                                    className={`login-input ${!isMobileValid && mobile.length === 10 ? 'input-error' : ''}`}
                                    placeholder="Enter 10-digit mobile number"
                                    value={mobile}
                                    onChange={handleMobileChange}
                                    maxLength={10}
                                />
                                {!isMobileValid && mobile.length > 0 && (
                                    <p className="validation-error">Must be a valid 10-digit number.</p>
                                )}
                                
                                <div className="login-with-title">Choose Authentication Method</div>
                                
                                {/* Auth Buttons */}
                                <div className="auth-buttons">
                                    {/* FIX 13: Corrected template literal string in className */}
                                    <button className={`auth-btn ${activeTab === "pin" ? "active" : ""}`} onClick={() => setActiveTab("pin")}>🔢 PIN</button>
                                    {/* FIX 14: Corrected template literal string in className */}
                                    <button className={`auth-btn ${activeTab === "face" ? "active" : ""}`} onClick={() => setActiveTab("face")} disabled={!isMobileValid}>🤳 Face ID</button>
                                    {/* FIX 15: Corrected template literal string in className */}
                                    <button className={`auth-btn ${activeTab === "voice" ? "active" : ""}`} onClick={() => setActiveTab("voice")} disabled={!isMobileValid}>🗣 Voice ID</button>
                                </div>
                                {!isMobileValid && mobile.length > 0 && activeTab === "login" && (
                                    <p className="validation-error-small">Enter a valid mobile number to enable Face/Voice ID.</p>
                                )}


                                {/* --- PIN PAD SECTION --- */}
                                {activeTab === "pin" && (
                                    <div className="pin-section">
                                        <div className="pin-circles">{renderPinCircles()}</div>
                                        {/* Using CSS class for numpad container (glass/grid layout) */}
                                        <div className="pin-pad glass"> 
                                            {numPad.map((row, rIdx) => (
                                                <div key={rIdx} className="num-row">
                                                    {row.map((col, cIdx) => {
                                                        const isControl = col === "DEL";
                                                        
                                                        // Empty cell placeholder
                                                        if (col === "") return <div key={cIdx} className="num-cell empty" />;
                                                        
                                                        return (
                                                            <div key={cIdx} className="num-cell">
                                                                <button 
                                                                    // FIX 16: Corrected template literal string in className
                                                                    className={`num-btn ${isControl ? 'control' : ''}`}
                                                                    onClick={() => isControl ? onDelete() : onNumberPress(col)}
                                                                    disabled={pinDigits.length === PIN_LENGTH && !isControl}
                                                                >
                                                                    {col === "DEL" ? "⌫" : col}
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="pin-actions">
                                            <button className="ghost" onClick={onClearPin}>Clear</button>
                                            <button 
                                                className="primary" 
                                                onClick={() => onSubmitPin(pinDigits.join(""))}
                                                disabled={pinDigits.length !== PIN_LENGTH}
                                            >
                                                Verify PIN
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* --- VOICE ID SECTION --- */}
                                {activeTab === "voice" && (
                                    <div className="voice-section">
                                        {micError && <div className="error">{micError}</div>}
                                        <div className="voice-stage">
                                            <audio ref={audioRef} hidden />
                                            {/* FIX 17: Corrected template literal string in className */}
                                            <div className={`voice-wave ${isRecording ? "recording" : ""}`}>
                                                {/* Visualizer bars */}
                                                {Array.from({ length: 12 }).map((_, i) => <div key={i} className="voice-bar" />)}
                                            </div>
                                        </div>
                                        <div className="voice-actions">
                                            <button className="small-btn secondary" onClick={handleGoBackToLogin} disabled={voiceSubmitted}>Go Back</button>
                                            
                                            {!isRecording && !voiceSubmitted ? (
                                                <button className="small-btn primary" onClick={startMic} disabled={micError}>Start Recording</button>
                                            ) : isRecording ? (
                                                <button className="small-btn danger" onClick={handleVoiceSubmit}>Submit Voice</button>
                                            ) : (
                                                <button className="small-btn primary" disabled>✅ Submitted</button>
                                            )}
                                            
                                        </div>
                                    </div>
                                )}

                                {/* --- NORMAL LOGIN BUTTON --- */}
                                {activeTab === "login" && (
                                    <div className="login-actions">
                                        <Link to={"/dashboardpage"}>
                                        <button 
                                            className="login-btn glow-btn" 
                                            onClick={handleNormalLogin}
                                            disabled={!isMobileValid} // Disabled until mobile is valid
                                        >
                                            Login
                                        </button>
                                        </Link>
                                        <div className="register-section">
                                            <span>Don't have an account?</span><Link to={"/signuppage"}> <a href="#reg" className="register-link">Register</a></Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* --- BACK: FACE ID --- */}
                        <div className="card-face back">
                            <h3 className="face-title">Face ID Verification</h3>
                            {cameraError && <div className="error">{cameraError}</div>}
                            <div className="face-stage back-stage">
                                {/* Video element for camera stream */}
                                {/* FIX 18: Corrected template literal string in className */}
                                <video ref={videoRef} className={`face-video back-video ${faceCaptured ? 'captured' : ''}`} autoPlay playsInline muted />
                                <div className="scan-ring back-ring" />
                            </div>
                            <div className="face-actions">
                                <button className="small-btn secondary" onClick={handleGoBackToLogin} disabled={faceCaptured}>Go Back</button>
                                <button 
                                    className="small-btn primary" 
                                    onClick={handleFaceCapture}
                                    disabled={!camStreamRef.current || faceCaptured || cameraError}
                                >
                                    {faceCaptured ? 'Processing...' : 'Capture & Verify'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}

export default Login;