"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // lucide-react is already available in Next.js projects
import { Button } from '../ui/button';


export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow-md  w-full z-50 pb-4 bg-indigo-100 backdrop-blur-md">
      {/* Navbar container */}
      <div className="max-w-6xl grid md:grid-cols-3 grid-cols-2 mx-auto px-4 justify-end items-center justify-items-end h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold self-start place-self-start">
            <img src="/logo.png" alt="Callent Tech Logo" className="md:h-20 h-12 w-auto sm:block" />
        </Link>

        {/* Burger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="#about" className="hover:text-blue-500">
            About
          </Link>
          <Link href="#contact" className="hover:text-blue-500">
            Services
          </Link>
          <Link href="#testimonials" className="hover:text-blue-500">
            Testimonials
          </Link>
          <Link href="#contact" className="hover:text-blue-500">
            Contact
          </Link>
        </div>
        <div className="hidden justify-end md:flex space-x-6">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 getstart md:block" onClick={() => scrollToRef(section1Ref)}>
              {/* <Phone className="w-4 h-4 mr-2" /> */}
              Get Started
            </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg flex flex-col space-y-4 px-6 py-4">
          <Link href="#about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="#contact" onClick={() => setIsOpen(false)}>
            Services
          </Link>
          <Link href="#testimonials" onClick={() => setIsOpen(false)}>
            Testimonials
          </Link>
          <Link href="#contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
