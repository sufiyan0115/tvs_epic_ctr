import Copyright from "./Copyright";
import { HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pt-[142px] pb-[60px]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left lg:justify-between gap-y-8">
          <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="300">
            <img width="168" height="60" src="/img/header/logo.png" alt="" />
          </div>
          <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="500">
            <div className="text-2xl uppercase font-medium mb-6">Links</div>
            <ul className="flex flex-col gap-y-3">
              <li key="home">
                <Link
                  className="font-medium hover:text-accent transition"
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              <li key="aboutUs">
                <a
                  className="font-medium hover:text-accent transition"
                  href="https://www.tvscredit.com/about-us"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="700">
            <div className="text-2xl uppercase font-medium mb-6">
              Contact us
            </div>
            <ul className="flex flex-col gap-y-3">
              <li
                className="font-medium hover:text-accent transition"
                key="email"
              >
                Email: helpdesk@tvscredit.com
              </li>
              <li
                className="font-medium hover:text-accent transition"
                key="phone"
              >
                Phone: 1800 103 5005
              </li>
            </ul>
          </div>
          <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="900">
            <div className="text-2xl uppercase font-medium mb-6">
              Found any issue?
            </div>
            <div className="text-xl text-light mb-[18px]">Reach out to us</div>
            <form className="max-w-[349px] mb-[10px]">
              <div className="h-[62px] p-[7px] flex border border-dark rounded-lg">
                <input
                  className="w-full h-full pl-6 border-none outline-none placeholder:text-dark"
                  type="text"
                  placeholder="Enter your email"
                />
                <button className="btn  btn-sm bg-accent hover:bg-accentHover w-[80px] text-white">
                  <HiMail style={{ width: "35px" }}></HiMail>
                </button>
              </div>
            </form>
          </div>
        </div>
        <hr
          className="mt-10 mb-5"
          data-aos="fade-up"
          data-aos-offset="100"
          data-aos-delay="200"
        />
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
