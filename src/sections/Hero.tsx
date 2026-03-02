import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onHireClick: () => void;
}

export default function Hero({ onHireClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="section-pinned bg-white dark:bg-gray-900 z-10"
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              #000 0px,
              #000 1px,
              transparent 1px,
              transparent 100px
            )`
          }} />
        </div>

        {/* Main Content - Centered Typography Only */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="text-center px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 block mb-4">
                Fashion Designer
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-display text-black dark:text-white leading-[0.85] mb-4"
            >
              ROJI
              <br />
              <span className="italic font-light">MAHARJAN</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-sans text-sm tracking-[0.2em] uppercase text-magenta block mb-8">
                Rose
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-lg mx-auto leading-relaxed mb-10"
            >
              Creating contemporary fashion that blends traditional craftsmanship 
              with modern aesthetics. Designing with passion, purpose, and a touch of rose.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4 justify-center"
            >
              <button 
                onClick={onHireClick} 
                className="btn-primary hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                Hire Me
              </button>
              <a href="#work" className="btn-outline">
                View Work
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gray-400 dark:text-gray-500">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </motion.div>
        </motion.div>

        {/* Corner Decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-black/10 dark:border-white/10" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-black/10 dark:border-white/10" />
      </div>
    </section>
  );
}