import React from 'react';
import { Link } from 'react-router-dom';
export const nav = [
  {name: 'New Template', href: '/template/draft'},
  { name: 'Drafts', href: '/template/draft/preview' },
  { name: 'Pending', href: '/template/pending' },
  { name: 'Approved', href: '/' },
  {name: 'Rejected',href:'/'}
];

const MobileNav = () => {
  return (
    <div className='bg-accent/95 w-full h-full'>
      <ul className='h-full flex flex-col justify-center items-center gap-y-8'>
        {nav.map((item, index) => {
          const { href, name } = item;
          return (
            <li key={index}>
              <Link className='link text-white text-xl' to={href}>
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileNav;
