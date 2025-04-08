import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black w-full h-64 flex flex-col items-center justify-center text-white top-[58px] relative">
      <div className="text-center space-y-2 flex justify-center space-x-8">
        <p className="hover:opacity-100 text-base  opacity-50 cursor-pointer text-white">
          Media
        </p>
        <p className="hover:opacity-100 text-base  opacity-50 cursor-pointer text-white">
          Sport
        </p>
        <p className="hover:opacity-100 text-base  opacity-50 cursor-pointer text-white">
          Economic
        </p>
      </div>
      <div className="text-center space-y-2 flex justify-center space-x-4">
        <i className="fa-brands fa-facebook-f fa-coffee text-2xl opacity-75 hover:opacity-100 cursor-pointer text-white"></i>
        <i className="fa-brands fa-youtube fa-coffee text-2xl opacity-75 hover:opacity-100 cursor-pointer text-white"></i>
        <i className="fa-brands fa-linkedin-in fa-coffee text-2xl opacity-75 hover:opacity-100 cursor-pointer text-white"></i>
        <i className="fa-brands fa-instagram fa-coffee text-2xl opacity-75 hover:opacity-100 cursor-pointer text-white"></i>
        <i className="fa-brands fa-snapchat fa-coffee text-2xl opacity-75 hover:opacity-100 cursor-pointer text-white"></i>
      </div>
      <div className="text-center space-y-2">
        <div className="flex justify-center space-x-4">
          <p className="opacity-50 ">
            News © {new Date().getFullYear()}, All rights reserved.
          </p>
          <a href="#" className="hover:underline opacity-75 hover:opacity-100 ">
            Privacy Notice
          </a>
          <a href="#" className="hover:underline opacity-75 hover:opacity-100 ">
            Terms of Condition
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
