import { useState, useEffect } from "react";
import "./landing.css";

import { GiPartyPopper } from "react-icons/gi";
import { GiLargeDress } from "react-icons/gi";
import { FaTshirt } from "react-icons/fa";

import Contact from "./Contact.jsx"
import PlansPage from "./Plans.jsx";


const slides = [
  {
    img: "/prim/party.png",
    icon: <GiPartyPopper />,
      color: "#f59e0b",
    title: "Party Wear",
    desc: "Shine at every party with our premium outfits."
  },
  {
    img: "/prim/weeds1.png",
    icon: <GiLargeDress />,
     color: "#ec4899", 
    title: "Wedding Collection",
    desc: "Make your special day royal with designer outfits."
  },
  {
    img: "/prim/western.png",
    icon: <FaTshirt />,
     color: "#3b82f6",
    title: "Western Style",
    desc: "Trendy western outfits for modern lifestyle."
  }
];






const LandingSections = () => {
  const [current, setCurrent] = useState(0);

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length); // ✅ FIX
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length); // ✅ FIX
  };

  const prevSlide = () => {
    setCurrent((current - 1 + slides.length) % slides.length); // ✅ FIX
  };






// for about section ===============

const aboutData = [

  {
     img: "/aboutimages/about2.png",
    title: "Relax Time",
    desc: "Live with nature",
  },
  {
    img: "/aboutimages/about3.png",
    title: "Our Office",
    desc: "This Building , where we work together .",
  },
  {
    img: "/aboutimages/about4.png",
    title: "Working Time",
    desc: "Our team fill smooth or flex on work time.",
  },
  {
    img: "/aboutimages/about5.png",
    title: "Mr. Chadda Rohaniyan",
    desc: "Our Team Counsilor.",
  },
  {
    img: "/aboutimages/about6.png",
    title: "Mr. Pratik Rathodiya",
    desc: "Our Company Director.",
  },
  {
    img: "/aboutimages/about7.png",
    title: "MR.Jack Singaon",
    desc: "Co-Founder.",
  },
   {
    img: "/aboutimages/about8.png",
    title: "Mr. Golu Kumar",
    desc: " Owner & Founder ,  Company.",
  },
];

const [index, setIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => (prev + 1) % aboutData.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);




  

  return (
    <div className="royal-landing-wrapper">

      <h2 className="royal-landing-title">Landing Section</h2>

      {/* FEATURES ===*/}
      <section id="features" className="royal-landing-section">
        <div className="royal-landing-content">

          {/* SLIDER */}
          <div className="royal-slider">
            <img src={slides[current].img} alt="slider" />


          <button className="left-btn" onClick={prevSlide}>‹</button>
            <button className="right-btn" onClick={nextSlide}>›</button>
          </div>

          {/* TEXT */}
           <div key={current} className="royal-landing-text">
            <h1>Premium Features</h1> <br/>
           <h2 className="slide-title">
  <span style={{ color: slides[current].color }}>
    {slides[current].icon}
  </span>
  {slides[current].title}
</h2>
            <p>{slides[current].desc}</p>
          </div>

        </div>
      </section>

  

     {/* TECHNOLOGY ================================*/}

<section id="technology" className="royal-landing-section">
  <div className="royal-landing-content reverse">

    {/* IMAGE */}
    <div className="tech-image-wrapper">
      <img src="/tech/tech.png" alt="technology" />
    </div>

    {/* TEXT */}
    <div className="royal-landing-text">
      <h2 className="tech-heading"> Powered by Modern Technology</h2>

      <ul className="tech-list">
        <li>⚡ Fast & responsive UI with React</li>
        <li>🔒 Secure authentication system</li>
        <li>💳 Cash on delivery available</li>
        <li>📦 Real-time inventory management</li>
        <li>📱 Fully mobile responsive design</li>
      </ul>
    </div>

  </div>
</section>

      {/* TEAM */}
     <section id="team" className="royal-landing-section">
  <div className="royal-landing-content">

    {/* STACK IMAGE UI */}
    <div className="royal-team-stack">
      <img src="/team/team1.png" className="royal-team-card" />
      <img src="/team/team2.png" className="royal-team-card" />
      <img src="/team/team5.png" className="royal-team-card" />
      <img src="/team/team4.png" className="royal-team-card" />
      <img src="/team/team3.png" className="royal-team-card" />
     
    </div>

    <div  className="royal-landing-text">
      <h2>Our Expert Team</h2>
      <p>Our team ensures premium styling...</p>
    </div>

  </div>
</section>

{/* ====== PLANS / PRICING SECTION ====== */}
{/* ====== PLANS / PRICING SECTION ====== */}
<section id="plans" className="royal-landing-section">
  <div className="royal-landing-content column">

    {/* TEXT */}
    <div className="royal-landing-text center">
      <h2>Our Premium Plans</h2>
      <p>Choose the best plan that suits your needs</p>
    </div>

    {/* ✅ Plans inside same container */}
    <div className="plans-wrapper-inside">
      <PlansPage />
    </div>

  </div>
</section>


      {/* ABOUT */}
   
<section id="about" className="rr-about-section">
  <div className="rr-about-content reverse">

    <img
      src={aboutData[index].img}
      alt="about"
      className="rr-about-image"
    />

    <div className="rr-about-text">
      <h2>About RegalRent</h2>
      <h3 className="rr-about-title">{aboutData[index].title}</h3>
      <p className="rr-about-desc">{aboutData[index].desc}</p>
    </div>

  </div>
</section>


     {/*======= SERVICES =================*/}

<section id="services" className="regal-services-section">
  <div className="regal-services-container">

    <h2 className="regal-services-title">Our Premium Services</h2>
    <p className="regal-services-subtitle">
      Elevate your fashion experience with Regal Rent
    </p>

    <div className="regal-services-grid">

      <div className="regal-service-card">
        <img src="/service/weeds.png" alt="rent" />
        <div className="regal-service-overlay">
          <h3>Rent Designer Wear</h3>
          <p>Luxury outfits for every occasion</p>
        </div>
      </div>

      <div className="regal-service-card">
        <img src="/service/delivery.png" alt="delivery" />
        <div className="regal-service-overlay">
          <h3>Fast Delivery</h3>
          <p>Quick & safe delivery at your doorstep</p>
          <p>& Pickup at home </p>
        </div>
      </div>

      <div className="regal-service-card">
        <img src="/service/fiting.png" alt="trial" />
        <div className="regal-service-overlay">
          <h3>Try Before Rent</h3>
          <p>Perfect fit before final booking</p>
        </div>
      </div>

      <div className="regal-service-card">
        <img src="/service/support.png" alt="support" />
        <div className="regal-service-overlay">
          <h3>24/7 Support</h3>
          <p>We are always here to help</p>
        </div>
      </div>

    </div>
  </div>
</section>

{/* contact page added here ========== */}
   
   <Contact />

    </div>
  );

};

  export default LandingSections;