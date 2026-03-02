import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Instagram, Linkedin } from 'lucide-react';
import { aboutData } from '@/data/portfolio';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleDownloadCV = () => {
    // Download the actual CV PDF
    const link = document.createElement('a');
    link.href = '/cv/roji-maharjan-cv.pdf';
    link.download = 'Roji-Maharjan-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="section-pinned bg-[#F5F5F5] z-20"
    >
      <div className="relative w-full h-full flex items-center overflow-hidden">
        {/* Large Background Title */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 0.03, x: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 font-serif text-[25vw] leading-none text-black pointer-events-none select-none"
        >
          ABOUT
        </motion.div>

        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row">
          {/* Left Side - Image */}
          <div className="lg:w-1/2 h-[40vh] lg:h-full relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              <img
                src={aboutData.image}
                alt="Roji Maharjan at work"
                className="w-full h-full object-cover image-bw"
              />
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F5F5F5]/50 lg:to-[#F5F5F5]/80" />
            </motion.div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12 lg:py-0">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-xs tracking-[0.3em] uppercase text-gray-500 mb-4"
            >
              The Designer
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-headline text-black mb-8"
            >
              {aboutData.name}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 mb-10"
            >
              {aboutData.bio.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="font-sans text-sm md:text-base text-gray-700 leading-relaxed max-w-lg"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <button 
                onClick={handleDownloadCV} 
                className="px-8 py-4 border border-red-600 text-red-600 dark:text-red-400 font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-red-600 hover:text-white"
              >
                <Download className="w-4 h-4 inline mr-2 text-red-600 dark:text-red-400" />
                Download CV
              </button>
              
              <div className="flex items-center gap-4">
                <a
                  href={aboutData.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-red-600 text-red-600 dark:text-red-400 flex items-center justify-center transition-all duration-300 hover:bg-red-600 hover:text-white"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={aboutData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-red-600 text-red-600 dark:text-red-400 flex items-center justify-center transition-all duration-300 hover:bg-red-600 hover:text-white"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-12"
            >
              <div>
                <span className="font-serif text-4xl text-black">2+</span>
                <p className="font-sans text-xs tracking-wider uppercase text-gray-500 mt-1">Years Experience</p>
              </div>
              <div>
                <span className="font-serif text-4xl text-black">10+</span>
                <p className="font-sans text-xs tracking-wider uppercase text-gray-500 mt-1">Projects</p>
              </div>
              <div>
                <span className="font-serif text-4xl text-black">5+</span>
                <p className="font-sans text-xs tracking-wider uppercase text-gray-500 mt-1">Events</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
