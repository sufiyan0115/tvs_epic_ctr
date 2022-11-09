import React, { useState, useEffect } from "react";
import { hero } from "../../data";
import { Link } from "react-router-dom";
import { HiOutlineArrowSmRight } from "react-icons/hi";

const Hero = () => {
  const { title, subtitle, btnText, compText, image } = hero;
  return (
    <section className="min-h-[750px] pt-12 pb-0 mt-5 lg:mt-0">
      <div className="container mx-auto min-h-[720px] flex justify-center items-center">
        <div className="flex flex-col lg:gap-x-[30px] gap-y-8 lg:gap-y-0 lg:flex-row items-center justify-center text-center lg:text-left">
          <div className="flex-1">
            <h1
              className="title mt-5 mb-5 lg:mb-5"
              data-aos="fade-down"
              data-aos-delay="500"
            >
              {title}
            </h1>
            <p
              className="lead mb-5 lg:mb-10"
              data-aos="fade-down"
              data-aos-delay="600"
            >
              {subtitle}
            </p>  
          </div>
          <div className="flex-1" data-aos="fade-up" data-aos-delay="800">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
