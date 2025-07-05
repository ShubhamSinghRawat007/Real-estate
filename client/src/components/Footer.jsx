import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">
            Real Estate
          </h3>
          <p className="text-sm leading-relaxed">
            Real Estate is your trusted real estate agency, helping you find,
            sell, or rent your dream property with ease and expertise.
          </p>
          <div className="flex items-center mt-4 space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-pink-500 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-700 transition"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/about"
                className="hover:underline hover:text-gray-400 transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/search"
                className="hover:underline hover:text-gray-400 transition"
              >
                Find Properties
              </a>
            </li>
            <li>
              <a
                href="/"
                className="hover:underline hover:text-gray-400 transition"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/"
                className="hover:underline hover:text-gray-400 transition"
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href="/"
                className="hover:underline hover:text-gray-400 transition"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>123 Real Estate Avenue, City, Country</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-500" />
              <span>+123 456 7890</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" />
              <span>info@ankit.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Real Estate. All rights reserved.</p>
        <p className="mt-2">
          Designed with ❤️ by <a href="/" className="text-blue-500">Real estate</a>
        </p>
      </div>
    </footer>
  );
}
