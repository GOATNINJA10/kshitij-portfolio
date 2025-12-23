'use client';

import { motion } from 'framer-motion';
import SpotlightCard from '../reactbits/SpotlightCard';
import { techStack } from '@/app/constants';

export default function SkillsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full overflow-y-auto p-4 sm:p-6 md:p-8"
      style={{ backgroundColor: 'var(--section-bg)' }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
        >
          Skills & Expertise
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {techStack.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + categoryIndex * 0.1 }}
            >
              <SpotlightCard
                className="bg-[var(--macos-sidebar)] rounded-xl border border-[var(--macos-border)] h-full"
                spotlightColor="rgba(10, 132, 255, 0.15)"
              >
                <div className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--macos-accent-blue)' }}>
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        className="px-3 py-1.5 text-sm rounded-lg hover:bg-[var(--macos-accent-blue)] hover:text-white transition-colors cursor-default"
                        style={{
                          backgroundColor: 'var(--skill-badge-bg)',
                          color: 'var(--skill-badge-text)'
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
