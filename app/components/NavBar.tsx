'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Me" },
    { href: "/resume", label: "Resume" },
    { href: "/projects", label: "Projects" },
    { href: "/certifications", label: "Certificates" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-transparent backdrop-blur-md px-10 fixed w-full mt-10 z-99">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-bold text-3xl text-black">
              <span className="flex items-center">
                SP ■
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="group relative text-black border border-black px-3 py-2 text-lg font-medium overflow-hidden"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    {link.label}
                  </span>
                  <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="group relative inline-flex items-center justify-center p-2 text-black border border-black overflow-hidden"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </span>
              <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-black border border-black block px-3 py-2 my-2 text-base font-medium overflow-hidden"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  {link.label}
                </span>
                <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;