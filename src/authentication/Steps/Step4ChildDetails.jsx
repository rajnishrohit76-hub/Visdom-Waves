import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2"; 
import {
  FaUser,
  FaCalendarAlt,
  FaTransgender,
  FaBookOpen,
  FaSchool,
  FaLanguage,
  FaLock
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Step4ChildDetails({ form, update, prevStep, submitForm }) {
  const [errors, setErrors] = useState({});
  const inputRefs = useRef([]);

  // Scroll to top and focus first input
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    inputRefs.current[0]?.focus();
  }, []);

  // ===== FIELD VALIDATIONS =====
  const validateChildName = (name) => {
    if (!name.trim()) return "Please enter child name";
    if (!/^[A-Za-z\s]+$/.test(name)) return "Only letters and spaces allowed";
    return "";
  };

  const validateChildSurname = (surname) => {
    if (!surname.trim()) return "Please enter child surname";
    if (!/^[A-Za-z\s]+$/.test(surname)) return "Only letters and spaces allowed";
    return "";
  };

  const validateDOB = (dob) => {
    if (!dob) return "Please select date of birth";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return "Date must be in YYYY-MM-DD format";
    const birthDate = new Date(dob);
    const today = new Date();
    if (isNaN(birthDate.getTime())) return "Invalid date";

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age -= 1;

    if (age < 3 || age > 20) return "Age must be 3-20 years";
    return "";
  };

  const validateGender = (gender) => (!gender ? "Please select gender" : "");
  const validateClass = (cls) => (!cls ? "Please select class" : "");
  const validateSyllabus = (syl) => (!syl ? "Please select syllabus" : "");
  const validateMedium = (med) => (!med ? "Please select medium" : "");
  const validatePIN = (pin) => {
    if (!pin) return "Please enter PIN";
    if (!/^\d{4}$/.test(pin)) return "PIN must be 4 digits";
    return "";
  };
  const validateRePIN = (rePin) => {
    if (!rePin) return "Please confirm PIN";
    if (rePin !== form.pin) return "PINs do not match";
    return "";
  };
  const validateAgree = (agree) => (!agree ? "You must accept Terms & Conditions" : "");
  const validateLanguages = (languages) => {
    return !languages.firstLanguage && !languages.secondLanguage && !languages.thirdLanguage
      ? "Please select at least one language"
      : "";
  };

  // ===== HANDLE CHANGE WITH SEQUENTIAL VALIDATION =====
  const handleChange = (field, value) => {
    update(field, value);

    let error = "";

    switch (field) {
      case "childName":
        error = validateChildName(value);
        setErrors((prev) => ({
          ...prev,
          childName: error,
          childSurname: "",
          childDOB: "",
          childGender: "",
          childClass: "",
          childSyllabus: "",
          medium: "",
          languages: "",
          pin: "",
          rePin: "",
          agree: ""
        }));
        break;

      case "childSurname":
        if (!form.childName) error = "Please fill Name first";
        else error = validateChildSurname(value);
        setErrors((prev) => ({
          ...prev,
          childSurname: error,
          childDOB: "",
          childGender: "",
          childClass: "",
          childSyllabus: "",
          medium: "",
          languages: "",
          pin: "",
          rePin: "",
          agree: ""
        }));
        break;

      case "childDOB":
        if (!form.childName) error = "Please fill Name first";
        else if (!form.childSurname) error = "Please fill Surname first";
        else error = validateDOB(value);
        setErrors((prev) => ({
          ...prev,
          childDOB: error,
          childGender: "",
          childClass: "",
          childSyllabus: "",
          medium: "",
          languages: "",
          pin: "",
          rePin: "",
          agree: ""
        }));
        break;

      case "childGender":
        if (!form.childName) error = "Please fill Name first";
        else if (!form.childSurname) error = "Please fill Surname first";
        else if (!form.childDOB) error = "Please select DOB first";
        else error = validateGender(value);
        setErrors((prev) => ({
          ...prev,
          childGender: error,
          childClass: "",
          childSyllabus: "",
          medium: "",
          languages: "",
          pin: "",
          rePin: "",
          agree: ""
        }));
        break;

      case "childClass":
        if (!form.childGender) error = "Please select Gender first";
        else error = validateClass(value);
        setErrors((prev) => ({
          ...prev,
          childClass: error,
          childSyllabus: "",
          medium: "",
          languages: "",
          pin: "",
          rePin: "",
          agree: ""
        }));
        break;

      case "childSyllabus":
        if (!form.childClass) error = "Please select Class first";
        else error = validateSyllabus(value);
        setErrors((prev) => ({
          ...prev,
          childSyllabus: error,
          medium: "",
          languages: "",
          pin: "",
          rePin: "",
          agree: ""
        }));
        break;

      case "medium":
        if (!form.childSyllabus) error = "Please select Syllabus first";
        else error = validateMedium(value);
        setErrors((prev) => ({
          ...prev,
          medium: error,
          languages: "",
          pin: "",
          rePin: "",
          agree: ""
        }));
        break;

      case "firstLanguage":
      case "secondLanguage":
      case "thirdLanguage":
        if (!form.medium) error = "Please select Medium first";
        else
          error = validateLanguages({
            firstLanguage: field === "firstLanguage" ? value : form.firstLanguage,
            secondLanguage: field === "secondLanguage" ? value : form.secondLanguage,
            thirdLanguage: field === "thirdLanguage" ? value : form.thirdLanguage
          });
        setErrors((prev) => ({
          ...prev,
          languages: error,
          pin: "",
          rePin: "",
          agree: ""
        }));
        break;

      case "pin":
        if (!form.medium) error = "Please select Medium first";
        else error = validatePIN(value);
        setErrors((prev) => ({
          ...prev,
          pin: error,
          rePin: form.rePin ? validateRePIN(form.rePin) : prev.rePin,
          agree: ""
        }));
        break;

      case "rePin":
        if (!form.pin) error = "Please create PIN first";
        else error = validateRePIN(value);
        setErrors((prev) => ({
          ...prev,
          rePin: error,
          agree: ""
        }));
        break;

      case "agree":
        if (!form.pin) error = "Please create PIN first";
        else error = validateAgree(value);
        setErrors((prev) => ({
          ...prev,
          agree: error
        }));
        break;

      default:
        break;
    }
  };

  const navigate = useNavigate();

  // ===== HANDLE FORM SUBMIT =====
  const handleSubmit = () => {
    const newErrors = {
      childName: validateChildName(form.childName),
      childSurname: form.childName ? validateChildSurname(form.childSurname) : "Please fill Name first",
      childDOB: form.childName && form.childSurname ? validateDOB(form.childDOB) : "Please fill previous fields first",
      childGender: form.childName && form.childSurname && form.childDOB ? validateGender(form.childGender) : "Please fill previous fields first",
      childClass: form.childGender ? validateClass(form.childClass) : "Please select Gender first",
      childSyllabus: form.childClass ? validateSyllabus(form.childSyllabus) : "Please select Class first",
      medium: form.childSyllabus ? validateMedium(form.medium) : "Please select Syllabus first",
      languages: form.medium
        ? validateLanguages({
            firstLanguage: form.firstLanguage,
            secondLanguage: form.secondLanguage,
            thirdLanguage: form.thirdLanguage
          })
        : "Please select Medium first",
      pin: form.medium ? validatePIN(form.pin) : "Please select Medium first",
      rePin: form.pin ? validateRePIN(form.rePin) : "Please create PIN first",
      agree: form.pin ? validateAgree(form.agree) : "Please create PIN first"
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err !== "");
    if (hasError) return;

    Swal.fire({
      title: "Success!",
      text: "Child details submitted successfully!",
      icon: "success",
      confirmButtonText: "OK"
    }).then(() => submitForm());

    navigate("/pricetable")
  };

  return (
    <div className="step-content">
      {/* Child Name */}
      <div className={`input-row ${errors.childName ? "error-border" : ""}`}>
        <div className="icon-col"><FaUser /></div>
        <input
          ref={(el) => (inputRefs.current[0] = el)}
          type="text"
          placeholder="Name"
          value={form.childName}
          maxLength={27}
          onChange={(e) => handleChange("childName", e.target.value)}
        />
        <div className="char-count">{form.childName.length}/27</div>
      </div>
      {errors.childName && <p className="error-text">{errors.childName}</p>}

      {/* Surname */}
      <div className={`input-row ${errors.childSurname ? "error-border" : ""}`}>
        <div className="icon-col"><FaUser /></div>
        <input
          ref={(el) => (inputRefs.current[1] = el)}
          type="text"
          placeholder="Surname"
          value={form.childSurname}
          maxLength={27}
          onChange={(e) => handleChange("childSurname", e.target.value)}
        />
      </div>
      {errors.childSurname && <p className="error-text">{errors.childSurname}</p>}

      {/* DOB */}
      <div className={`input-row ${errors.childDOB ? "error-border" : ""}`}>
        <div className="icon-col"><FaCalendarAlt /></div>
        <input
          ref={(el) => (inputRefs.current[2] = el)}
          type="date"
          value={form.childDOB}
          min="1900-01-01"
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => handleChange("childDOB", e.target.value)}
        />
      </div>
      {errors.childDOB && <p className="error-text">{errors.childDOB}</p>}

      {/* Gender */}
      <div className={`input-row ${errors.childGender ? "error-border" : ""}`}>
        <div className="icon-col"><FaTransgender /></div>
        <select
          ref={(el) => (inputRefs.current[3] = el)}
          value={form.childGender}
          onChange={(e) => handleChange("childGender", e.target.value)}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      {errors.childGender && <p className="error-text">{errors.childGender}</p>}

      {/* Class */}
      <div className={`input-row ${errors.childClass ? "error-border" : ""}`}>
        <div className="icon-col"><FaBookOpen /></div>
        <select
          ref={(el) => (inputRefs.current[4] = el)}
          value={form.childClass}
          onChange={(e) => handleChange("childClass", e.target.value)}
        >
          <option value="">Select Class</option>
          {["Nursery","Class I","Class II","Class III","Class IV","Class V","Class VI","Class VII","Class VIII","Class IX","Class X","Class XI","Class XII","Degree"].map(cls => (
            <option key={cls}>{cls}</option>
          ))}
        </select>
      </div>
      {errors.childClass && <p className="error-text">{errors.childClass}</p>}

      {/* Syllabus */}
      <div className={`input-row ${errors.childSyllabus ? "error-border" : ""}`}>
        <div className="icon-col"><FaSchool /></div>
        <select
          ref={(el) => (inputRefs.current[5] = el)}
          value={form.childSyllabus}
          onChange={(e) => handleChange("childSyllabus", e.target.value)}
        >
          <option value="">Select Syllabus</option>
          {["CBSE","ICSE","State Board","IB"].map(syl => <option key={syl}>{syl}</option>)}
        </select>
      </div>
      {errors.childSyllabus && <p className="error-text">{errors.childSyllabus}</p>}

      {/* Medium */}
      <div className={`input-row ${errors.medium ? "error-border" : ""}`}>
        <div className="icon-col"><FaLanguage /></div>
        <select
          value={form.medium}
          onChange={(e) => handleChange("medium", e.target.value)}
        >
          <option value="">Select Medium</option>
          {["English","Hindi","Regional"].map(med => <option key={med}>{med}</option>)}
        </select>
      </div>
      {errors.medium && <p className="error-text">{errors.medium}</p>}

      {/* Languages */}
      {["firstLanguage","secondLanguage","thirdLanguage"].map((lang,i) => (
        <div key={lang} className="input-row">
          <div className="icon-col"><FaLanguage /></div>
          <select
            value={form[lang]}
            onChange={(e) => handleChange(lang, e.target.value)}
          >
            <option value="">{["First","Second","Third"][i]} Language</option>
            {["English","Hindi","Telugu","Tamil","Kannada"].map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
      ))}
      {errors.languages && <p className="error-text">{errors.languages}</p>}

      {/* PIN */}
      <div className={`input-row ${errors.pin ? "error-border" : ""}`}>
        <div className="icon-col"><FaLock /></div>
        <input
          type="password"
          placeholder="Create PIN"
          value={form.pin}
          maxLength={4}
          onChange={(e) => handleChange("pin", e.target.value)}
        />
      </div>
      {errors.pin && <p className="error-text">{errors.pin}</p>}

      {/* Confirm PIN */}
      <div className={`input-row ${errors.rePin ? "error-border" : ""}`}>
        <div className="icon-col"><FaLock /></div>
        <input
          type="password"
          placeholder="Confirm PIN"
          value={form.rePin}
          maxLength={4}
          onChange={(e) => handleChange("rePin", e.target.value)}
        />
      </div>
      {errors.rePin && <p className="error-text">{errors.rePin}</p>}

      {/* Checkbox */}
      <div className={`agree-row ${errors.agree ? "error-border" : ""}`}>
        <label>
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(e) => handleChange("agree", e.target.checked)}
          />{" "}
          I agree with the <span className="linkish">Terms & Conditions</span>
        </label>
      </div>
      {errors.agree && <p className="error-text">{errors.agree}</p>}

      {/* Buttons */}
      <div className="btn-row spaced">
        <button type="button" className="btn btn-secondary" onClick={prevStep}>
          Previous
        </button>
        <button type="button" className="btn btn-submit btn-success" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Step4ChildDetails;