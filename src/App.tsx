import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Gallery from '@/sections/Gallery';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import { initialProjects } from '@/data/portfolio';
import type { Project } from '@/types';
import { useTheme } from 'next-themes';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  // Initialize projects and admin state from localStorage
  useEffect(() => {
    // Initialize projects
    const savedProjects = localStorage.getItem('portfolio-projects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error('Failed to parse saved projects', e);
        // Fallback to initial projects if parsing fails
        setProjects(initialProjects);
      }
    } else {
      // If no saved projects, use initial projects
      setProjects(initialProjects);
    }

    // Initialize admin authentication state
    const savedAdminAuth = localStorage.getItem('admin-authenticated');
    if (savedAdminAuth) {
      try {
        setIsAdminAuthenticated(JSON.parse(savedAdminAuth));
      } catch (e) {
        console.error('Failed to parse admin authentication state', e);
      }
    }
  }, []);

  // Simulate initial loading - changed from 1500ms to 2000ms (2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Save projects to localStorage when changed
  useEffect(() => {
    if (projects.length > 0) {
      try {
        localStorage.setItem('portfolio-projects', JSON.stringify(projects));
        console.log('Projects saved to localStorage:', projects);
      } catch (e) {
        console.error('Failed to save projects to localStorage', e);
      }
    }
  }, [projects]);

  // Save admin authentication state to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('admin-authenticated', JSON.stringify(isAdminAuthenticated));
      console.log('Admin authentication state saved to localStorage:', isAdminAuthenticated);
    } catch (e) {
      console.error('Failed to save admin authentication state to localStorage', e);
    }
    
    // Automatically open dashboard when authenticated
    if (isAdminAuthenticated) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminDashboardOpen(false);
    }
  }, [isAdminAuthenticated]);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setIsAdminLoginOpen(false);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setIsAdminDashboardOpen(false);
    toast.info('Logged out successfully');
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectsChange = (newProjects: Project[]) => {
    setProjects(newProjects);
    // Explicitly save to localStorage when projects change via admin
    try {
      localStorage.setItem('portfolio-projects', JSON.stringify(newProjects));
      console.log('Projects updated via admin and saved to localStorage:', newProjects);
    } catch (e) {
      console.error('Failed to save projects to localStorage after admin update', e);
    }
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-[1000] flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className={`font-serif text-4xl md:text-6xl ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4`}
              >
                Rose
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`${theme === 'dark' ? 'bg-white' : 'bg-black'} w-32 h-px mx-auto mb-4 origin-left`}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className={`font-sans text-xs tracking-[0.3em] uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  Fashion Designer
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '0',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          },
        }}
      />

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation onAdminClick={() => setIsAdminLoginOpen(true)} />

      {/* Main Content */}
      <main className="relative">
        <Hero onHireClick={scrollToContact} />
        <About />
        <Gallery projects={projects} />
        <Contact onHireClick={scrollToContact} />
        <Footer />
      </main>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {isAdminLoginOpen && (
          <AdminLogin
            isOpen={isAdminLoginOpen}
            onClose={() => setIsAdminLoginOpen(false)}
            onLogin={handleAdminLogin}
          />
        )}
      </AnimatePresence>

      {/* Admin Dashboard */}
      <AnimatePresence>
        {isAdminDashboardOpen && (
          <AdminDashboard
            isOpen={isAdminDashboardOpen}
            onClose={() => setIsAdminDashboardOpen(false)}
            onLogout={handleAdminLogout}
            projects={projects}
            onProjectsChange={handleProjectsChange}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;