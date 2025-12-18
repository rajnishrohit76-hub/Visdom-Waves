import React, { useEffect, useRef, useState } from "react";
import { FaLock, FaEye } from "react-icons/fa";

function Step2Password({ form, update, nextStep, prevStep }) {
  const [errors, setErrors] = useState({
    pin: "",
    confirmPin: "",
  });
  const [showPin, setShowPin] = useState(false);

  const pinRef = useRef(null);
  const confirmPinRef = useRef(null);

  useEffect(() => {
    pinRef.current?.focus();
  }, []);

  // Function to validate digit input
  const handleDigitInput = (value, field) => {
    if (/^\d*$/.test(value)) { // Only digits allowed
      update(field, value);
      setErrors((prev) => ({
        ...prev,
        [field === "parentPin" ? "pin" : "confirmPin"]: "",
      }));

      // Move focus to confirm PIN when 4 digits entered
      if (value.length === 4 && field === "parentPin") {
        confirmPinRef.current?.focus();
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        [field === "parentPin" ? "pin" : "confirmPin"]: "Only digits allowed",
      }));
    }
  };

  const handleNext = () => {
    let valid = true;
    let newErrors = { pin: "", confirmPin: "" };

    if (!/^\d{4}$/.test(form.parentPin)) {
      newErrors.pin = "PIN must be exactly 4 digits";
      valid = false;
    }

    if (!/^\d{4}$/.test(form.parentPinConfirm)) {
      newErrors.confirmPin = "Confirm PIN must be exactly 4 digits";
      valid = false;
    } else if (form.parentPin !== form.parentPinConfirm) {
      newErrors.confirmPin = "PINs do not match";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) nextStep();
  };

  return (
    <div className="step-content">

      {/* Parent PIN */}
      <div className={`input-row ${errors.pin ? "error-border" : ""}`}>
        <div className="icon-col"><FaLock /></div>

        <input
          ref={pinRef}
          type={showPin ? "text" : "password"}
          placeholder="Set 4-Digit Parent Pin"
          value={form.parentPin}
          maxLength={4}
          onChange={(e) => handleDigitInput(e.target.value, "parentPin")}
        />

        <div className="eye-icon" onClick={() => setShowPin(!showPin)}>
          <FaEye />
        </div>
      </div>
      {errors.pin && <p className="error-text">{errors.pin}</p>}

      {/* Confirm PIN */}
      <div className={`input-row ${errors.confirmPin ? "error-border" : ""}`}>
        <div className="icon-col"><FaLock /></div>

        <input
          ref={confirmPinRef}
          type={showPin ? "text" : "password"}
          placeholder="Re-enter Pin"
          value={form.parentPinConfirm}
          maxLength={4}
          onChange={(e) => handleDigitInput(e.target.value, "parentPinConfirm")}
        />

        <div className="eye-icon" onClick={() => setShowPin(!showPin)}>
          <FaEye />
        </div>
      </div>
      {errors.confirmPin && <p className="error-text">{errors.confirmPin}</p>}

      {/* Navigation Buttons */}
      <div className="btn-row spaced">
        <button type="button" className="btn btn-secondary" onClick={prevStep}>
          Previous
        </button>
        <button type="button" className="btn btn-primary ghost" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Step2Password;
