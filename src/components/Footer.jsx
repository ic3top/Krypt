import React from 'react';

import logo from '../../images/logo.png';
import NavLinks from './NavLinks';

const Footer = ({ links }) => (
  <div className="w-full flex justify-between items-center flex-col py-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
        <img src={logo} alt="logo" className="w-32" />
      </div>
      <div className="flex flex-1 justify-center">
        <NavLinks links={links} />
      </div>
    </div>

    <div className="w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">@kryptomastery2022</p>
      <p className="text-white text-right text-xs">All rights reserved</p>
    </div>
  </div>
);

export default Footer;
