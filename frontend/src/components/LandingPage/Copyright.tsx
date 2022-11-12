import React from "react";
import { Link } from "react-router-dom";
const copyright = {
  social: [
    {
      icon: "/img/copyright/facebook.svg",
      href: "https://www.facebook.com/TVSCREDIT/",
    },
    {
      icon: "/img/copyright/twitter.svg",
      href: "https://twitter.com/TVSCredit",
    },
    {
      icon: "/img/copyright/linkedin.svg",
      href: "https://www.linkedin.com/company/tvs-credit-services-ltd-/",
    },
  ],
};

const Copyright = () => {
  const { social } = copyright;
  return (
    <div
      className="flex flex-col items-center gap-y-2 lg:flex-row lg:justify-between"
      data-aos="fade-up"
      data-aos-offset="0"
      data-aos-delay="200"
    >
      <div className="flex gap-x-6">
        <Link className="hover:text-accent transition" to={"/"}>
          Privacy & Terms
        </Link>
      </div>
      <div>Copyright @ 2022 TVS CREDIT</div>
      <ul className="flex gap-x-[12px]">
        {social.map((item, index) => {
          const { href, icon } = item;
          return (
            <li key={index}>
              <a href={href}>
                <img src={icon} alt="" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Copyright;
