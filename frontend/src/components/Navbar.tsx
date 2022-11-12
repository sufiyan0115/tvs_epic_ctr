import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import {nav} from "../featureData";

function Navbar(props:any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`w-full ${props.className}`}>
      <nav className={`bg-white shadow-lg ${props.className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
                <Link to={"/"}>
              <div className="flex-shrink-0">
                <img
                  className="w-32"
                  src="/img/header/logo.png"
                  alt="Workflow"
                />
              </div>
                </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {nav.map((item,index) => {
                    return (
                      <Link
                      key={index}
                        to={item.href}
                        className=" hover:text-accent text-black px-3 py-2 rounded-md text-md font-medium"
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-accent inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-accentHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref: any) => (
            <div className="md:hidden  transition-all delay-1000" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3 transition-all delay-1000">
              {nav.map((item,index) => {
                    return (
                        <Link
                        key={index}
                        to={item.href}
                        className=" hover:text-accent  transition-all delay-200 text-black block px-3 py-2 rounded-md text-base font-medium"
                      >
                        {item.name}
                      </Link>
                    );
                  })}
               
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Navbar;
