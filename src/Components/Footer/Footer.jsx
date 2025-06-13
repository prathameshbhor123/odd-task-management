import React, { useEffect, useState } from "react";
import { Mail, Phone, ArrowRight } from "lucide-react";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <footer
      className={`bg-gray-800 text-gray-300 py-8 px-6 sm:px-20 transition-all duration-700 ease-out transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start gap-8 sm:gap-0">
        {/* Logo & About */}
        <div className="flex flex-col gap-4 sm:w-1/3">
          <h1 className="text-3xl font-extrabold tracking-widest text-white">
            oddTech
          </h1>
          <p className="text-sm text-gray-400">
            Innovating tech solutions with creativity and precision.
          </p>
          <div className="flex items-center gap-3 text-gray-400 text-sm mt-2">
            <Phone className="w-5 h-5 text-gray-400" />
            <span>+1 (234) 567-890</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <Mail className="w-5 h-5 text-gray-400" />
            <span>contact@oddtech.com</span>
          </div>
        </div>

        {/* Quick Links */}
        <nav className="sm:w-1/3 flex flex-col gap-3">
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          {["About Us", "Services", "Blog", "Contact", "Privacy Policy"].map(
            (link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                {link}
              </a>
            )
          )}
        </nav>

        {/* Social Links */}
        <div className="sm:w-1/3 flex flex-col gap-6">
          <div>
            <h3 className="text-white font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-5 text-gray-400 text-lg">
              <a
                href="https://linkedin.com/company/oddtech"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://twitter.com/oddtech"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://facebook.com/oddtech"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} oddTech. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
