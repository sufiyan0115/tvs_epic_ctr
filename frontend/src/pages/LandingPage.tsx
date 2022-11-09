import React from 'react';

// import aos
import Aos from 'aos';
// import aos css
import 'aos/dist/aos.css';

// import components
import Header from '../components/LandingPage/Header'
import Hero from '../components/LandingPage/Hero';
import Feature1 from '../components/LandingPage/Feature1';
import Feature2 from '../components/LandingPage/Feature2';
import Feature3 from '../components/LandingPage/Feature3';
import Footer from '../components/LandingPage/Footer';

const App = () => {
  // initialize aos
  Aos.init({
    duration: 1800,
    offset: 100,
  });
  return (
    <div className='overflow-hidden'>
      <Header />
      <Hero />
      <Feature1 />
      <Feature2 />
      <Feature3 />
      <Footer />
    </div>
  );
};

export default App;
