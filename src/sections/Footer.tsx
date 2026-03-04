import { motion } from 'framer-motion';
import { ArrowUp, Heart, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white py-12 px-8 md:px-16 lg:px-24 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo / Name */}
          <div>
            <h3 className="font-serif text-2xl text-black mb-2">Roji Maharjan</h3>
            <p className="font-sans text-xs tracking-wider uppercase text-gray-500">
              Fashion Designer — "Rose"
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap gap-8">
            <a href="#hero" className="nav-link dark:text-black dark:hover:text-magenta">Home</a>
            <a href="#about" className="nav-link dark:text-black dark:hover:text-magenta">About</a>
            <a href="#work" className="nav-link dark:text-black dark:hover:text-magenta">Work</a>
            <a href="#contact" className="nav-link dark:text-black dark:hover:text-magenta">Contact</a>
          </nav>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -4 }}
            className="flex items-center gap-2 font-sans text-xs tracking-wider uppercase text-gray-500 dark:text-black dark:hover:text-magenta transition-colors"
          >
            Back to Top
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-8 mt-8">
          <a 
            href="https://www.instagram.com/your_instagram_handle" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-magenta dark:text-black dark:hover:text-magenta transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-sans text-sm">Instagram</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/your_linkedin_profile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-magenta dark:text-black dark:hover:text-magenta transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span className="font-sans text-sm">LinkedIn</span>
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black/10 my-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-black">
            © {new Date().getFullYear()} Roji Maharjan. All rights reserved.
          </p>
          
          <p className="font-sans text-xs text-black flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-magenta fill-magenta" /> by Selroti
          </p>
        </div>
      </div>
    </footer>
  );
}