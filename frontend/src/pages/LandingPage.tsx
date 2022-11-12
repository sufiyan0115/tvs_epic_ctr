import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Header from "../components/LandingPage/Header";
import Hero from "../components/LandingPage/Hero";
import RightFeature from "../components/LandingPage/RightFeature";
import LeftFeature from "../components/LandingPage/LeftFeature";
import Footer from "../components/LandingPage/Footer";
import { features } from "../featureData";

const LandingPage = () => {
  Aos.init({
    duration: 1800,
    offset: 100,
  });
  return (
    <div className="overflow-hidden">
      <Header />
      <Hero />
      <RightFeature content={features.feature1} />
      <LeftFeature content={features.feature2} />
      <RightFeature content={features.feature3} imgoffset="400" paraoffset="500" />
      <Footer />
    </div>
  );
};

export default LandingPage;
