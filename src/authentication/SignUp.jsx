import React, { useState } from "react";
import "./SignUp.css"
import { Link } from "react-router-dom";
import Step1MobileOTP from "./Steps/Step1MobileOTP;";
import Step2Password from "./Steps/Step2Password";
import Step3PersonalDetails from "./Steps/Step3PersonalDetails";
import Step4ChildDetails from "./Steps/Step4ChildDetails";

function SignUp() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    mobile: "",
    parentPin: "",
    parentPinConfirm: "",
    pName: "",
    pSurname: "",
    pAltMobile: "",
    pEmail: "",
    pMotherTongue: "",
    country: "",
    pincode: "",
    state: "",
    city: "",
    district: "",
    address: "",
    childName: "",
    childSurname: "",
    childDOB: "",
    childGender: "",
    childClass: "",
    childSyllabus: "",
    medium: "",
    firstLanguage: "",
    secondLanguage: "",
    thirdLanguage: "",
    pin: "",
    rePin: "",
    agree: false,
  });

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const submitForm = () => {
    console.log(form);
    alert("Form Submitted!");
  };

  return (
  <>
    <video autoPlay loop muted playsInline className="bg-video">
      <source src="/Login Background/Video.mp4" type="video/mp4" />
    </video>
    
    <div className="reg-page">
      <div className="reg-card">

        <h2 className="reg-title">
          {step === 1 && "Get Started Now"}
          {step === 2 && "Set Pin"}
          {step === 3 && "Parent Details"}
          {step === 4 && "Child Details"}
        </h2>

        {step === 1 && <Step1MobileOTP form={form} update={update} nextStep={nextStep} />}
        {step === 2 && <Step2Password form={form} update={update} nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <Step3PersonalDetails form={form} update={update} nextStep={nextStep} prevStep={prevStep} />}
        {step === 4 && <Step4ChildDetails form={form} update={update} prevStep={prevStep} submitForm={submitForm} />}
       
        <div className="signin-note">
          Already Have An Account? <Link to={"/loginpage"}><span className="linkish">Log In</span></Link>
         </div>
      </div>
    </div>
  </>
  );
}

export default SignUp;