import React from "react";
import { FaInstagram, FaTelegramPlane, FaTwitter } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();
  const yourName = "Mamadaminov Umedjon";

  return (
    <footer className="bg-gray-200 mt-11 py-4 text-orange-400 font-extrabold footer footer-center flex flex-wrap items-center justify-center gap-16">
      <p className="text-center  sm:mb-0">
        &copy; {currentYear} {yourName}
      </p>
      <div className="flex justify-center space-x-4">
        <a
          href="https://www.instagram.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://t.me/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTelegramPlane size={24} />
        </a>
        <a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size={24} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
