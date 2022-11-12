import React from "react";

import { Link } from "react-router-dom";
import {nav} from "../../featureData";


const Nav = (props:any) => {
  return (
    <nav className={`${props.className}`}>
      <ul className="flex gap-x-10">
        {nav.map((item, index) => {
          const { href, name } = item;
          return (
            <li key={index}>
              <Link
                className="font-medium hover:text-accent transition"
                to={`${href}`}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
