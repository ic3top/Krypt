import React from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';

const NavBarItem = ({ title, href, classProps }) => (
  <Link
    className={`mx-2 cursor-pointer ${classProps} rounded-full bg-transparent py-2 px-4 hover:bg-gray-900`}
    to={href}
    smooth={true}
    duration={300}
  >
    {title}
  </Link>
);

const NavLinks = ({ links }) => {
  return (
    <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
      {links.map((item, index) => (
        <NavBarItem key={item + index} title={item.text} href={item.href} />
      ))}
      <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
        Login
      </li>
    </ul>
  );
};

export default NavLinks;
