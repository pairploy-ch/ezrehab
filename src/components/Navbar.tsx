import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-[90%] mx-auto py-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="EZREHAB Logo" className="h-6 md:h-6" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="nav-link">About Us</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#booking" className="nav-link">Booking</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a href="#about" className="nav-link" onClick={() => setIsOpen(false)}>About Us</a>
              <a href="#services" className="nav-link" onClick={() => setIsOpen(false)}>Services</a>
              <a href="#booking" className="nav-link" onClick={() => setIsOpen(false)}>Booking</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
