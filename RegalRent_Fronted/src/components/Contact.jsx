

import React, { useState, useRef, useEffect } from "react";
import "./contact.css";

const videos = [
  "/videos/ocean/ocean1.mp4",
  "/videos/ocean/ocean2.mp4",
  "/videos/ocean/ocean3.mp4",
];

const Contact = () => {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState(0);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    whatsapp_number: "",
    address: "",
    selected_plan: "",
  });

  /* 🎥 VIDEO SWITCH */
  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  /*  LOAD + LISTEN SELECTED PLAN */
  useEffect(() => {
  const loadPlan = () => {
    const savedPlan = localStorage.getItem("selectedPlan");

    setFormData((prev) => ({
      ...prev,
      selected_plan: savedPlan || "",
    }));
  };

  // initial load
  loadPlan();

  //  listen custom event (REAL TIME FIX)
  window.addEventListener("planUpdated", loadPlan);

  return () => {
    window.removeEventListener("planUpdated", loadPlan);
  };
}, []);

  /* 🔹 INPUT CHANGE */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* 🔹 SUBMIT */
  const handleSubmit = async (e) => {
    console.log("FORM DATA :", formData);
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      alert("Thanks for contact us 😊 ! We will contact you soon");

      // ✅ RESET FORM
      setFormData({
        full_name: "",
        email: "",
        mobile_number: "",
        whatsapp_number: "",
        address: "",
        selected_plan: "",
      });

      // ✅ REMOVE PLAN
      localStorage.removeItem("selectedPlan");

    } catch (error) {
      alert("Error");
    }
  };

  return (
    <section id="contact" className="uni-contact-section">

      {/* 🎥 VIDEO BG */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="video-bg"
        key={currentVideo}
      >
        <source src={videos[currentVideo]} type="video/mp4" />
      </video>

      <div className="video-overlay"></div>

      <div className="uni-contact-container">
        <h2 className="uni-contact-title">Contact Us</h2>

        <p className="uni-contact-subtitle">
          Join our membership & get premium rental services
        </p>

        {/* SELECTED PLAN DISPLAY */}
        {formData.selected_plan && (
          <p className="selected-plan-text">
             Selected Plan: {formData.selected_plan}
          </p>
        
        )}
        <br/>

        <form className="uni-contact-form" onSubmit={handleSubmit}>
          

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="mobile_number"
            placeholder="Mobile Number"
            value={formData.mobile_number}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="whatsapp_number"
            placeholder="WhatsApp Number"
            value={formData.whatsapp_number}
            onChange={handleChange}
          />

          {/*  AUTO FILLED PLAN */}
          <input
            type="text"
            name="selected_plan"
            placeholder="Selected Plan"
            value={formData.selected_plan}
            readOnly
          />

          <textarea
            name="address"
            placeholder="Address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Send</button>

        </form>
      </div>
    </section>
  );



};

export default Contact;