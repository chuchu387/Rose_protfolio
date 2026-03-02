import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lock, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

interface NavigationProps {
  onAdminClick: () => void;
  isAdminAuthenticated: boolean | null; // Added prop to track admin authentication status
}

export default function Navigation({ onAdminClick, isAdminAuthenticated }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Determine active section
      const sections = ['hero', 'about', 'work', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {/* Floating Navigation Dock */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isScrolled ? 0 : -100, 
          opacity: isScrolled ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]"
      >
        <div className="bg-white/90 backdrop-blur-md border border-black/10 px-2 py-2 shadow-lg flex items-center">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 font-sans text-xs tracking-wider uppercase transition-colors ${
                    activeSection === item.id 
                      ? 'text-black' 
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
          
          {/* Theme Toggle Button */}
          <div className="w-px h-6 bg-black/10 mx-2" />
          <button
            onClick={toggleTheme}
            className="px-3 py-2 font-sans text-[10px] tracking-wider uppercase text-gray-400 hover:text-magenta transition-colors flex items-center gap-1"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          
          {/* Admin Button - Conditionally display based on authentication status */}
          <div className="w-px h-6 bg-black/10 mx-2" />
          <button
            onClick={onAdminClick}
            className="px-3 py-2 font-sans text-[10px] tracking-wider uppercase text-gray-400 hover:text-magenta transition-colors flex items-center gap-1"
          >
            <Lock className="w-3 h-3" />
            {isAdminAuthenticated ? 'Admin Dashboard' : 'Admin'}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-6 right-6 z-[100] w-12 h-12 bg-white/90 backdrop-blur-md border border-black/10 flex items-center justify-center shadow-lg lg:hidden"
      >
        <Menu className="w-5 h-5" />
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-white lg:hidden"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif text-2xl">Roji Maharjan</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-12 h-12 border border-black flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center">
                <ul className="space-y-6">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="font-serif text-4xl text-black hover:text-magenta transition-colors"
                      >
                        {item.label}
                      </button>
                    </motion.li>
                  ))}
                  
                  {/* Theme Toggle in Mobile Menu */}
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <button
                      onClick={toggleTheme}
                      className="font-serif text-4xl text-black hover:text-magenta transition-colors flex items-center gap-2"
                    >
                      {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
                    </button>
                  </motion.li>
                </ul>
              </nav>

              <div className="pt-8 border-t border-black/10">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onAdminClick();
                  }}
                  className="font-sans text-xs tracking-wider uppercase text-gray-500 hover:text-black transition-colors flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  {isAdminAuthenticated ? 'Admin Dashboard' : 'Admin Login'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}