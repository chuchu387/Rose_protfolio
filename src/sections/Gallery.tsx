import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { Project } from '@/types';

interface GalleryProps {
  projects: Project[];
}

export default function Gallery({ projects }: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all'); // Default to showing all projects
  const { } = useTheme();

  // Extract unique categories from projects
  const categories = ['all', ...Array.from(new Set(projects.map(project => project.category)))];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleProjectClick = (index: number) => {
    if (filteredProjects[index]) {
      setSelectedProject(filteredProjects[index]);
    }
  };

  return (
    <section
      ref={containerRef}
      id="work"
      className="section-pinned bg-white dark:bg-gray-900 z-30"
    >
      <div className="relative w-full h-full flex items-center overflow-hidden">
        {/* Vertical Title */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
        >
          <span className="vertical-text font-serif text-[8vw] text-black/5 dark:text-white/5 tracking-wider">
            WORK
          </span>
        </motion.div>

        <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 block mb-4">
              Selected Projects
            </span>
            <h2 className="font-serif text-headline text-black dark:text-white">
              Portfolio
            </h2>
          </motion.div>

          {/* Category Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 font-sans text-xs tracking-wider uppercase transition-colors ${
                  selectedCategory === category
                    ? 'bg-black dark:bg-white dark:text-black text-white'
                    : 'border border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid - Standard Responsive Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id || index} 
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="cursor-pointer group"
                onClick={() => handleProjectClick(index)}
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-none"> {/* Square aspect ratio maintained for consistency */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 dark:group-hover:bg-white/20 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="font-sans text-xs tracking-wider uppercase text-white/70">{project.category}</span>
                    <h3 className="font-serif text-xl text-white">{project.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-black/90" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white dark:bg-gray-900 max-w-5xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black text-white dark:bg-white dark:text-black flex items-center justify-center hover:bg-magenta transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 h-[40vh] lg:h-[60vh]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <span className="font-sans text-xs tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 mb-4">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-serif text-4xl lg:text-5xl text-black dark:text-white mb-6">
                    {selectedProject.title}
                  </h3>
                  <p className="font-sans text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-xs text-gray-400 dark:text-gray-500">
                      {new Date(selectedProject.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}