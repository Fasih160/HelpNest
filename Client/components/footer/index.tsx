import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaPodcast,
} from "react-icons/fa";
import logo from "@/assets/logo.png";
import { navLinks } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-white py-10 px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <Link href="/" className="flex items-center justify-center">
          <img src={logo.src} alt="HelpNest" className="w-48 sm:w-56" />
        </Link>

        {navLinks.slice(1).map((navLink, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold text-gray-100">
              {navLink.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {navLink.children?.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-400">&copy; 2024 HelpNest</div>
        <div className="flex flex-wrap justify-center space-x-4 mt-6 md:mt-0">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Privacy Notice
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Legal
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Cookie Policy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Your Privacy Choices
          </a>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaYoutube size={24} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaTiktok size={24} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaPodcast size={24} />
          </a>
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#"
            className="bg-neutral-700 hover:bg-neutral-600 px-5 py-3 rounded-lg text-sm text-gray-300 hover:text-white transition-colors duration-300 text-center"
          >
            Get it on Google Play
          </a>
          <a
            href="#"
            className="bg-neutral-700 hover:bg-neutral-600 px-5 py-3 rounded-lg text-sm text-gray-300 hover:text-white transition-colors duration-300 text-center"
          >
            Download on the App Store
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
