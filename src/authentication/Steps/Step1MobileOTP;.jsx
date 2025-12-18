import React, { useEffect, useRef, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import Swal from "sweetalert2";

function Step1MobileOTP({ form, update, nextStep }) {
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const mobileRef = useRef(null);

  useEffect(() => {
    mobileRef.current?.focus();
  }, []);

  useEffect(() => {
    let countdown;
    if (isOtpSent && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [isOtpSent, timer]);

  // ===== Mobile number validation =====
  const handleMobileChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      update("mobile", value);
      setError("");
    } else {
      setError("Only numbers are allowed");
    }
  };

  const handleNext = () => {
    const mobile = form.mobile.trim();

    if (!mobile) {
      setError("Please enter your mobile number");
      return;
    }

    if (mobile.length !== 10) {
      setError("Mobile number must be exactly 10 digits");
      return;
    }

    setError("");
    sendOtp(mobile);
  };

  const sendOtp = (mobile) => {
    Swal.fire({
      title: "OTP Sent!",
      text: `We have sent an OTP to ${mobile}`,
      icon: "success",
      confirmButtonText: "OK",
    });

    setIsOtpSent(true);
    setTimer(30);
    setOtp(""); // Reset OTP input
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }

    if (value.length === 6) {
      setError("");
    }
  };

  const handleOtpSubmit = () => {
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be exactly 6 digits");
      return;
    }

    // Dummy OTP check
    if (otp === "123456") {
      setError("");
      nextStep();
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = () => {
    sendOtp(form.mobile);
  };

  return (
    <div className="step-content">
      {!isOtpSent ? (
        <div className={`input-row ${error ? "error-border" : ""}`}>
          <div className="icon-col">
            <FaPhoneAlt />
          </div>
          <input
            ref={mobileRef}
            type="tel"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleMobileChange}
            maxLength="10"
          />
        </div>
      ) : (
        <div className={`input-row ${error ? "error-border" : ""}`}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            maxLength="6"
          />
        </div>
      )}

      {error && <p className="error-text">{error}</p>}

      {!isOtpSent ? (
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-primary ghost"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-primary ghost"
            onClick={handleOtpSubmit}
          >
            Validate OTP
          </button>
          {timer === 0 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>
          )}
        </div>
      )}

      {isOtpSent && timer > 0 && (
        <div className="timer">
          <p>OTP expires in {timer}s</p>
        </div>
      )}
      {isOtpSent && timer === 0 && (
        <div className="timer">
          <p>OTP has expired. Please request a new one.</p>
        </div>
      )}
    </div>
  );
}

export default Step1MobileOTP;
