import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gray-800 text-white py-8"
    >
      <div className="container mx-auto text-center">
        <div className="flex justify-center gap-6 mb-4">
          
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to="#about"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            About
          </Link>
          <a
            href="#about"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            Services
          </a>
          <a
            href="mailto:malekmostafa0051@gmail.com"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            Contact
          </a>
        </div>
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <FaGithub size={24} />
            </svg>
          </a>
          <Link
            to="#"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <FaLinkedin size={24} />
            </svg>
          </Link>
        </div>
        <p className="text-gray-400">
          © 2024 Malek's Data Analytics. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
