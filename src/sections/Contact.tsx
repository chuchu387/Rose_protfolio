import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Phone, Instagram, Linkedin } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from 'emailjs-com';

interface ContactProps {
  onHireClick: () => void;
}

export default function Contact({ onHireClick }: ContactProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if environment variables are set
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error(
        'Email configuration is incomplete. Please check your environment variables.\n\n' +
        'Required variables:\n' +
        '- VITE_EMAILJS_SERVICE_ID\n' +
        '- VITE_EMAILJS_TEMPLATE_ID\n' +
        '- VITE_EMAILJS_PUBLIC_KEY\n\n' +
        'Please contact the site administrator to configure these settings.'
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'rozee123maharjan@gmail.com'
      };

      // For emailjs-com v3.x, the send function takes the public key as a string
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('EmailJS Response:', response); // Log for debugging
      
      toast.success('Message sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error('EmailJS Error:', error); // Log the actual error
      toast.error(`Failed to send message. Error: ${error.text || error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="section-pinned bg-black z-40"
    >
      <div className="relative w-full h-full flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              #fff 0px,
              #fff 1px,
              transparent 1px,
              transparent 100px
            )`
          }} />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row">
          {/* Left Side - Contact Info */}
          <div className="lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 lg:py-0">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-xs tracking-[0.3em] uppercase text-white/50 mb-4"
            >
              Get In Touch
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-headline text-white mb-8"
            >
              Let's Talk
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-base text-white/70 leading-relaxed max-w-md mb-10"
            >
              Whether you're looking for a custom design, collaboration, or just want to 
              discuss fashion, I'd love to hear from you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 mb-10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <span className="font-sans text-xs tracking-wider uppercase text-white/50 block">Email</span>
                  <a href="mailto:rozee123maharjan@gmail.com" className="font-sans text-white hover:text-magenta transition-colors">
                    rozee123maharjan@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <span className="font-sans text-xs tracking-wider uppercase text-white/50 block">Phone</span>
                  <a href="tel:+9779741699891" className="font-sans text-white hover:text-magenta transition-colors">
                    +977 9741699891
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4"
            >
              <a
                href="https://www.instagram.com/rojii______/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-white/20 flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/roji-maharjan-61ab672bb/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-white/20 flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-12 py-12 lg:py-0">
            <motion.form
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-sans text-xs tracking-wider uppercase text-white/50 block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/30 py-3 text-white font-sans focus:outline-none focus:border-magenta transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs tracking-wider uppercase text-white/50 block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/30 py-3 text-white font-sans focus:outline-none focus:border-magenta transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="font-sans text-xs tracking-wider uppercase text-white/50 block mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/30 py-3 text-white font-sans focus:outline-none focus:border-magenta transition-colors"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="font-sans text-xs tracking-wider uppercase text-white/50 block mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-white/30 py-3 text-white font-sans focus:outline-none focus:border-magenta transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-[#D9004C] text-white font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-black dark:hover:bg-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={onHireClick}
                  className="px-8 py-4 border border-magenta text-magenta font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:bg-magenta hover:text-white w-full sm:w-auto"
                >
                  Hire Me
                </button>
              </div>
            </motion.form>
          </div>
        </div>

        {/* Large Decorative Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.02 } : {}}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="absolute bottom-0 right-0 font-serif text-[20vw] leading-none text-white pointer-events-none select-none"
        >
          HIRE
        </motion.div>
      </div>
    </section>
  );
}