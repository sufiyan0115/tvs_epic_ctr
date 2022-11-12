import React, { useState, useEffect } from "react";
import { HiMenuAlt4, HiOutlineX } from "react-icons/hi";
import MobileNav from "./MobileNav";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const logoutButtonClickHandler = () => {
    if (user) {
      console.log(user);
      logout();
    } else {
      navigate("/signin");
    }
  };

  return (
    <header
      className={`${
        isActive ? "lg:top-0 bg-white shadow-2xl" : "lg:top-[60px]"
      } py-6 lg:py-4 fixed w-full transition-all z-10`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="/">
        <div data-aos="fade-down" data-aos-delay="1000">
          <img width="168" height="60" src="/img/header/logo.png" alt="" />
        </div>
        </a>
        {user && <div
          className="hidden lg:flex"
          data-aos="fade-down"
          data-aos-delay="1200"
        >
          <Nav />
        </div>}
        <button
          className="btn btn-sm btn-outline hidden lg:flex"
          data-aos="fade-down"
          data-aos-delay="1400"
          onClick={logoutButtonClickHandler}
        >
          {user ? "Logout" : "Login"}
        </button>
        <button className="lg:hidden" onClick={() => setMobileNav(!mobileNav)}>
          {mobileNav ? (
            <HiOutlineX className="text-3xl text-accent" />
          ) : (
            <HiMenuAlt4 className="text-3xl text-accent" />
          )}
        </button>
        <div
          className={`${
            mobileNav ? "left-0" : "-left-full"
          }  fixed top-0 bottom-0 w-[60vw] lg:hidden transition-all`}
        >
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
