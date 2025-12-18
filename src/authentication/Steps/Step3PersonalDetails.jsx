import React, { useEffect, useRef, useState } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaCity,
  FaBuilding,
  FaLanguage
} from "react-icons/fa";
import Swal from "sweetalert2";
import "animate.css";

function Step3PersonalDetails({ form, update, nextStep, prevStep }) {
  const [errors, setErrors] = useState({});
  const [loadingLocation, setLoadingLocation] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus(); // Auto-focus first input
  }, []);

  // ===========================
  // Validation Functions
  // ===========================
  const validateName = (name) => {
    if (!name.trim()) return "Please enter your name";
    if (!/^[A-Za-z\s]+$/.test(name)) return "Only letters and spaces are allowed";
    if (name.length > 27) return "Name should not exceed 27 characters";
    return "";
  };

  const validateSurname = (surname) => {
    if (!surname.trim()) return "Please enter your surname";
    if (!/^[A-Za-z\s]+$/.test(surname)) return "Only letters and spaces are allowed";
    if (surname.length > 27) return "Surname should not exceed 27 characters";
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Please enter your email";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address";
    return "";
  };

  const validateAltMobile = (mobile) => {
    if (mobile && !/^\d{10}$/.test(mobile)) return "Mobile number must be 10 digits";
    return "";
  };

  const validateMotherTongue = (value) => {
    if (!value.trim()) return "Please select your Mother Tongue";
    return "";
  };

  const validateAddress = (value) => (!value.trim() ? "Please enter your Flat / House no." : "");
  const validateCity = (value) => (!value.trim() ? "Please enter your city" : "");
  const validateDistrict = (value) => (!value.trim() ? "Please enter your district" : "");
  const validateState = (value) => (!value.trim() ? "Please enter your state" : "");
  const validateCountry = (value) => (!value.trim() ? "Please enter your country" : "");
  const validatePincode = (value) => (!/^\d{6}$/.test(value) ? "Pincode must be 6 digits" : "");

  // ===========================
  // Handle Field Changes
  // ===========================
  const handleChange = (field, value) => {
    if (field === "pAltMobile" || field === "pincode") {
      value = value.replace(/\D/g, "");
    }

    let error = "";

    switch (field) {
      case "pName":
        error = validateName(value);
        setErrors((prev) => ({
          ...prev,
          pName: error,
          pSurname: "",
          pEmail: "",
          pAltMobile: "",
          pMotherTongue: "",
          address: "",
          district: "",
          city: "",
          state: "",
          pincode: "",
          country: ""
        }));
        break;

      case "pSurname":
        if (!form.pName) error = "Please fill Name first";
        else error = validateSurname(value);
        setErrors((prev) => ({
          ...prev,
          pSurname: error,
          pEmail: "",
          pAltMobile: "",
          pMotherTongue: "",
          address: "",
          district: "",
          city: "",
          state: "",
          pincode: "",
          country: ""
        }));
        break;

      case "pEmail":
        if (!form.pName) error = "Please fill Name first";
        else if (!form.pSurname) error = "Please fill Surname first";
        else error = validateEmail(value);
        setErrors((prev) => ({ ...prev, pEmail: error }));
        break;

      case "pAltMobile":
        if (!form.pName) error = "Please fill Name first";
        else if (!form.pSurname) error = "Please fill Surname first";
        else error = validateAltMobile(value);
        setErrors((prev) => ({ ...prev, pAltMobile: error }));
        break;

      case "pMotherTongue":
        if (!form.pName) error = "Please fill Name first";
        else if (!form.pSurname) error = "Please fill Surname first";
        else if (!form.pEmail) error = "Please fill Email first";
        else error = validateMotherTongue(value);
        setErrors((prev) => ({ ...prev, pMotherTongue: error }));
        break;

      case "address":
        if (!form.pMotherTongue) error = "Please select Mother Tongue first";
        else error = validateAddress(value);
        setErrors((prev) => ({ ...prev, address: error }));
        break;

      case "district":
        if (!form.address) error = "Please fill Address first";
        else error = validateDistrict(value);
        setErrors((prev) => ({ ...prev, district: error }));
        break;

      case "city":
        if (!form.district) error = "Please fill District first";
        else error = validateCity(value);
        setErrors((prev) => ({ ...prev, city: error }));
        break;

      case "state":
        if (!form.city) error = "Please fill City first";
        else error = validateState(value);
        setErrors((prev) => ({ ...prev, state: error }));
        break;

      case "pincode":
        if (!form.state) error = "Please fill State first";
        else error = validatePincode(value);
        setErrors((prev) => ({ ...prev, pincode: error }));
        break;

      case "country":
        if (!form.pincode) error = "Please fill Pincode first";
        else error = validateCountry(value);
        setErrors((prev) => ({ ...prev, country: error }));
        break;

      default:
        break;
    }

    update(field, value);
  };

  // ===========================
  // Submit Form
  // ===========================
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      pName: validateName(form.pName),
      pSurname: form.pName ? validateSurname(form.pSurname) : "Please fill Name first",
      pEmail: form.pName && form.pSurname ? validateEmail(form.pEmail) : "Please fill previous fields first",
      pAltMobile: form.pName && form.pSurname ? validateAltMobile(form.pAltMobile) : "",
      pMotherTongue: form.pName && form.pSurname && form.pEmail ? validateMotherTongue(form.pMotherTongue) : "Please fill previous fields first",
      address: form.pMotherTongue ? validateAddress(form.address) : "Please select Mother Tongue first",
      district: form.address ? validateDistrict(form.district) : "Please fill Address first",
      city: form.district ? validateCity(form.city) : "Please fill District first",
      state: form.city ? validateState(form.state) : "Please fill City first",
      pincode: form.state ? validatePincode(form.pincode) : "Please fill State first",
      country: form.pincode ? validateCountry(form.country) : "Please fill Pincode first"
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) return;

    Swal.fire({
      icon: "success",
      title: "Success 👍",
      text: "Parent Details Submitted Successfully!",
      showConfirmButton: false,
      timer: 2600,
      showClass: { popup: "animate__animated animate__backInDown" },
      hideClass: { popup: "animate__animated animate__backOutUp" }
    });

    setTimeout(() => nextStep(), 2400);
  };

  // ===========================
  // Fetch Current Location
  // ===========================
  const fetchCurrentAddress = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();
        const addr = data.address;

        update("address", addr.road || addr.suburb || "");
        update("city", addr.city || addr.town || addr.village || "");
        update("district", addr.county || addr.state_district || "");
        update("state", addr.state || "");
        update("country", addr.country || "");
        update("pincode", addr.postcode || "");

        setErrors({});
      } catch {
        alert("Unable to fetch address!");
      }
      setLoadingLocation(false);
    });
  };

  return (
    <form className="step-content" onSubmit={handleSubmit}>
      {/* Name */}
      <div className={`input-row ${errors.pName ? "error-border" : ""}`}>
        <div className="icon-col"><FaUser /></div>
        <input
          ref={(el) => (inputRefs.current[0] = el)}
          type="text"
          placeholder="Name"
          value={form.pName}
          maxLength={27}
          onChange={(e) => handleChange("pName", e.target.value)}
        />
        <div className="char-count">{form.pName.length}/27</div>
      </div>
      {errors.pName && <p className="error-text">{errors.pName}</p>}

      {/* Surname */}
      <div className={`input-row ${errors.pSurname ? "error-border" : ""}`}>
        <div className="icon-col"><FaUser /></div>
        <input
          ref={(el) => (inputRefs.current[1] = el)}
          type="text"
          placeholder="Surname"
          value={form.pSurname}
          maxLength={27}
          onChange={(e) => handleChange("pSurname", e.target.value)}
        />
        <div className="char-count">{form.pSurname.length}/27</div>
      </div>
      {errors.pSurname && <p className="error-text">{errors.pSurname}</p>}

      {/* Alternate Mobile */}
      <div className={`input-row ${errors.pAltMobile ? "error-border" : ""}`}>
        <div className="icon-col"><FaPhoneAlt /></div>
        <input
          type="text"
          maxLength={10}
          placeholder="Alternate Mobile (Optional)"
          value={form.pAltMobile}
          onChange={(e) => handleChange("pAltMobile", e.target.value)}
        />
      </div>
      {errors.pAltMobile && <p className="error-text">{errors.pAltMobile}</p>}

      {/* Email */}
      <div className={`input-row ${errors.pEmail ? "error-border" : ""}`}>
        <div className="icon-col"><FaEnvelope /></div>
        <input
          type="email"
          placeholder="Email"
          value={form.pEmail}
          onChange={(e) => handleChange("pEmail", e.target.value)}
        />
      </div>
      {errors.pEmail && <p className="error-text">{errors.pEmail}</p>}

      {/* Mother Tongue */}
      <div className={`input-row ${errors.pMotherTongue ? "error-border" : ""}`}>
        <div className="icon-col"><FaLanguage /></div>
        <select
          value={form.pMotherTongue}
          onChange={(e) => handleChange("pMotherTongue", e.target.value)}
        >
          <option value="">Select Mother Tongue</option>
          <option>Hindi</option>
          <option>English</option>
          <option>Telugu</option>
          <option>Tamil</option>
          <option>Punjabi</option>
        </select>
      </div>
      {errors.pMotherTongue && <p className="error-text">{errors.pMotherTongue}</p>}

      {/* Use Current Location */}
      <button
        type="button"
        onClick={fetchCurrentAddress}
        className="btn btn-light mb-3 w-100"
        disabled={loadingLocation}
      >
        {loadingLocation ? "Fetching Location..." : "📍Use Current Location"}
      </button>

      {/* Address */}
      <div className={`input-row ${errors.address ? "error-border" : ""}`}>
        <div className="icon-col"><FaMapMarkerAlt /></div>
        <input
          type="text"
          placeholder="Flat / Home no./ Building name."
          value={form.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </div>
      {errors.address && <p className="error-text">{errors.address}</p>}

      {/* District */}
      <div className={`input-row ${errors.district ? "error-border" : ""}`}>
        <div className="icon-col"><FaMapMarkerAlt /></div>
        <input
          type="text"
          placeholder="District"
          value={form.district}
          onChange={(e) => handleChange("district", e.target.value)}
        />
      </div>
      {errors.district && <p className="error-text">{errors.district}</p>}

      {/* City */}
      <div className={`input-row ${errors.city ? "error-border" : ""}`}>
        <div className="icon-col"><FaCity /></div>
        <input
          type="text"
          placeholder="City"
          value={form.city}
          onChange={(e) => handleChange("city", e.target.value)}
        />
      </div>
      {errors.city && <p className="error-text">{errors.city}</p>}

      {/* State */}
      <div className={`input-row ${errors.state ? "error-border" : ""}`}>
        <div className="icon-col"><FaBuilding /></div>
        <input
          type="text"
          placeholder="State"
          value={form.state}
          onChange={(e) => handleChange("state", e.target.value)}
        />
      </div>
      {errors.state && <p className="error-text">{errors.state}</p>}

      {/* Pincode */}
      <div className={`input-row ${errors.pincode ? "error-border" : ""}`}>
        <div className="icon-col"><FaBuilding /></div>
        <input
          type="text"
          maxLength={6}
          placeholder="Pincode"
          value={form.pincode}
          onChange={(e) => handleChange("pincode", e.target.value)}
        />
      </div>
      {errors.pincode && <p className="error-text">{errors.pincode}</p>}

      {/* Country */}
      <div className={`input-row ${errors.country ? "error-border" : ""}`}>
        <div className="icon-col"><FaGlobe /></div>
        <input
          type="text"
          placeholder="Country"
          value={form.country}
          onChange={(e) => handleChange("country", e.target.value)}
        />
      </div>
      {errors.country && <p className="error-text">{errors.country}</p>}

      {/* Buttons */}
      <div className="btn-row spaced">
        <button type="button" className="btn btn-secondary" onClick={prevStep}>
          Previous
        </button>
        <button type="submit" className="btn btn-primary ghost">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Step3PersonalDetails;
