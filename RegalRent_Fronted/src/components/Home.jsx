
import { useState, useEffect, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import LandingSections from "./Landing";
import "./Home.css";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

/* ================= IMAGE ARRAYS ================= */

//  Homepage Images / Collections or Trendings
const homeImages = [
  // only big images
  "/homepageImages/imageS1.png",
  "/homepageImages/imageS4.png",
  "/homepageImages/imageS3.png",
  "/homepageImages/imageS.png",
  "/homepageImages/imageS1.png",
  "/homepageImages/imageS2.png",

  // only big images
  // this image show in trending fashions
  "/homepageImages/image.png",
  "/homepageImages/image1.png",
  "/homepageImages/imagek.png",
  "/homepageImages/image2.png",
];

//  Fashion Images
const fashionImages = [
  "/fashion-images/fashionImg-1.jpg",
  "/fashion-images/fashion-2.jpg",
  "/fashion-images/fashion-3.jpg",
  "/fashion-images/image copy 3.png",
  "/fashion-images/fashion-5.jpg",
  "/fashion-images/image copy 5.png",
  "/fashion-images/style-5.jpg",
  "/fashion-images/image copy 6.png",
  "/fashion-images/image copy 8.png",
  "/fashion-images/styl-boy-2.jpg",
  "/fashion-images/style-boy-4.jpg",
  "/fashion-images/style-boy-5.jpg",
  "/fashion-images/style-boy-6.jpg",
  "/fashion-images/style-girl-1.jpg",
  "/fashion-images/style-girl-2.jpg",
  "/fashion-images/style-girl-3.jpg",
];

//  Suits Collection

const suitsImages = [
  "/suits/image1.png",
  "/suits/image2.png",
  "/suits/image3.png",
  "/suits/image4.png",
  "/suits/image5.png",
  "/suits/image6.png",
  "/suits/image7.png",
  "/suits/image8.png",
  "/suits/image9.png",
  "/suits/image10.png",
  "/suits/image11.png",
  "/suits/image12.png",
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const location = useLocation();
  const scrollRef = useRef(null);

  // const heroImages = homeImages.slice(0, 6);  //(0 , 3) jitni no hogi utna images render hogi
  // ✅ ONLY HERO IMAGES
  const heroImages = [
    "/homepageImages/imageS1.png",
    "/homepageImages/imageS4.png",
    "/homepageImages/imageS3.png",
    "/homepageImages/imageS.png",
    "/homepageImages/imageS1.png",
    "/homepageImages/imageS2.png",
  ];

  const mediaImages = homeImages.slice(1, 6); //(1 , 6 ) jitni no hogi utna images render hogi

  const scrollAmount = 600;

  /* ================= HERO AUTO SLIDE ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ================= SCROLL TO SECTION ================= */
  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);

  /* ================= SCROLL BUTTONS ================= */
  const scrollLeft = () => {
    const container = scrollRef.current;
    if (!container) return;

    if (container.scrollLeft <= 0) {
      container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    if (!container) return;

    if (
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 5
    ) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    const auto = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 5
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 2500);

    return () => clearInterval(auto);
  }, []);


//  for video play =========================
const videos = [
  "/videos/clothes1.mp4",
  "/videos/clothes2.mp4",
  // "/videos/clothes1.mp4",
];

const [currentVideo, setCurrentVideo] = useState(0);
const videoRef = useRef(null);



  return (
    <>
      <Header />

      <Box className="royal-home-wrapper">
        {/* ================= HERO ================= */}
        <Box
          className="royal-hero-section"
          sx={{
            // height: "100vh",
            height: { xs: "90vh", md: "120vh" }, // desktop pe bada hero
            marginTop: "72px",
            backgroundImage: `url(${heroImages[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
            }}
          />

          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Typography sx={{ fontSize: { xs: "36px", md: "64px" } }}>
              REGAL RENTALS
            </Typography>

            <Typography sx={{ mt: 2 }}>ELEVATE YOUR OCCASION</Typography>

            <Button
              sx={{
                mt: 5,
                border: "1px solid #fff",
                color: "#fff",
                px: 5,
                "&:hover": { background: "#fff", color: "#000" },
              }}
            >
              DISCOVER COLLECTION
            </Button>
          </Box>
        </Box>

        {/* ================= COLLECTIONS ================= */}
        <Box sx={{ width: "100%", py: 10, px: { xs: 2, md: 6 } }}>
          <Typography sx={{ textAlign: "center", fontSize: "32px", mb: 6 }}>
            Trendings Fashions
          </Typography>

          <Box sx={{ position: "relative" }}>
            <button className="royal-scroll-btn left" onClick={scrollLeft}>
              <ArrowBackIosNewIcon fontSize="small" />
            </button>

            <button className="royal-scroll-btn right" onClick={scrollRight}>
              <ArrowForwardIosIcon fontSize="small" />
            </button>

            <Box
              ref={scrollRef}
              sx={{
                display: "flex",
                gap: 4,
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {homeImages.slice(6).map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    minWidth: { xs: "280px", md: "420px" },
                    height: { xs: "320px", md: "520px" },
                    borderRadius: "20px",
                    overflow: "hidden",
                    position: "relative",
                    scrollSnapAlign: "start",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: "translateY(-10px) scale(1.03)",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
                    },
                    "&:hover img": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {/* Image */}
                  <Box
                    component="img"
                    src={image}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "0.6s",
                    }}
                  />

                  {/* Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1))",
                    }}
                  />

                  {/* Text */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 20,
                      left: 20,
                      color: "#fff",
                      zIndex: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                      Trending Style
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ================= MEDIA BLOCK ================= */}
       <Box
       id="blocks"
  sx={{
    width: "100%",
    py: 10,
    px: { xs: 2, md: 6 },
  }}
>
  <Typography sx={{ fontSize: "32px", mb: 6, textAlign: "center" }}>
    MEDIA BLOCK
  </Typography>

  <Box className="royal-media-wrapper">

    {/* LEFT SIDE (IMAGES) */}
    <Box className="royal-media-left">
      <Box className="royal-media-stack">
        {mediaImages.slice(0, 5).map((img, index) => (
          <img key={index} src={img} className="royal-stack-card" />
        ))}
      </Box>
    </Box>





    {/* RIGHT SIDE (VIDEOS) */}


    <Box className="royal-media-right">
  <video
  key={currentVideo}
  ref={videoRef}
  src={videos[currentVideo]}
  autoPlay
  muted
  playsInline
  preload="auto"   //  important
  onEnded={() =>
    setCurrentVideo((prev) =>
      prev === videos.length - 1 ? 0 : prev + 1
    )
  }
  onCanPlay={(e) => e.target.play()} //  force instant play
  className="royal-video"
/>
      
    </Box>

  </Box>
</Box>

        {/* ================= FASHION GALLERY ================= */}
        <Box id="collections" sx={{ width: "100%", py: 10, px: { xs: 2, md: 6 } }}>
          <Typography sx={{ textAlign: "center", fontSize: "32px", mb: 6 }}>
            FASHION COLLECTION
          </Typography>

          <Box className="royal-fashion-grid">
            {fashionImages.map((img, index) => (
              <Box key={index} className="royal-fashion-card">
                <img src={img} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* ================= SUITS COLLECTION ================= */}
        <Box sx={{ width: "100%", py: 10, px: { xs: 2, md: 6 } }}>
          <Typography sx={{ textAlign: "center", fontSize: "32px", mb: 6 }}>
            SUITS COLLECTION
          </Typography>

          <Box className="royal-suits-grid">
            {suitsImages.map((img, index) => (
              <Box key={index} className="royal-suits-card">
                <img src={img} alt={`suit-${index}`} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* ================= LANDING ================= */}
        <LandingSections />
      </Box>
    </>
  );
};

export default Home;
