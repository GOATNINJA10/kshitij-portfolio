'use client';

import { motion } from 'framer-motion';
import { Download, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import SplitText from '../reactbits/SplitText';
import CircularText from '../reactbits/CircularText';

export default function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full overflow-y-auto p-4 sm:p-6 md:p-8 relative"
      style={{ backgroundColor: 'var(--section-bg)' }}
    >
      {/* Decorative Circular Text */}
      <div className="absolute top-10 right-10 opacity-20 pointer-events-none hidden md:block">
        <CircularText
          text="PORTFOLIO • DEVELOPER • DESIGNER • "
          radius={80}
          className="text-[var(--macos-accent-blue)]"
          duration={15}
        />
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          {/* Profile Image with Gradient Border */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="gradient-border mb-6"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white">
                KB
              </div>
            </div>
          </motion.div>

          {/* Name and Title */}
          <div className="mb-2" style={{ color: 'var(--heading-text)' }}>
            <SplitText
              text="Kshitij Bramhecha"
              className="text-4xl font-bold inline-block"
              delay={50}
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl mb-6"
            style={{ color: 'var(--macos-accent-blue)' }}
          >
            Full Stack Web Developer
          </motion.p>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="leading-relaxed mb-8 max-w-2xl"
            style={{ color: 'var(--body-text)' }}
          >
            <p className="mb-4">
              Hi, I'm Kshitij, a Full Stack Web Developer based in India with a passion for
              code. I specialize in building modern web applications and turning innovative
              ideas into reality through clean, efficient development.
            </p>
            <p>
              With 1+ years of experience and 4+ completed projects, I focus on creating
              seamless user experiences and robust solutions using cutting-edge technologies.
              From AI-powered applications to immersive 3D experiences, I deliver results that matter.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <motion.a
              href="/files/kshitijfinalresume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--macos-accent-blue)] text-white rounded-lg font-medium hover:brightness-110 transition-all"
            >
              <Download size={18} />
              Download Resume
            </motion.a>
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--macos-accent-green)] text-white rounded-lg font-medium hover:brightness-110 transition-all"
            >
              <MessageCircle size={18} />
              Let's Talk
            </motion.button> */}
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <div className="bg-[var(--macos-sidebar)] p-6 rounded-xl border border-[var(--macos-border)]">
            <h3 className="text-2xl font-bold text-[var(--macos-accent-blue)] mb-2">1+</h3>
            <p className="text-[var(--macos-text-secondary)]">Years Experience</p>
          </div>
          <div className="bg-[var(--macos-sidebar)] p-6 rounded-xl border border-[var(--macos-border)]">
            <h3 className="text-2xl font-bold text-[var(--macos-accent-green)] mb-2">4+</h3>
            <p className="text-[var(--macos-text-secondary)]">Projects Completed</p>
          </div>
          <div className="bg-[var(--macos-sidebar)] p-6 rounded-xl border border-[var(--macos-border)]">
            <h3 className="text-2xl font-bold text-[var(--macos-accent-yellow)] mb-2">7+</h3>
            <p className="text-[var(--macos-text-secondary)]">TechStack Used</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
