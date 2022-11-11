import React from "react";

import { Link } from "react-router-dom";
export const nav = [
  { name: "New Template", href: "/template/draft" },
  { name: "Drafts", href: "/template/draft/preview" },
  { name: "Pending", href: "/template/pending" },
  { name: "Approved", href: "/" },
  {name: 'Rejected',href:'/'}

];

const Nav = () => {
  return (
    <nav>
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
