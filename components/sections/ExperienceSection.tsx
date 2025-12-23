'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    company: 'Ellipsis Infotech',
    position: 'SDE Intern',
    period: 'Jan 2025 - March 2025',
    description: 'Enhanced data collection capabilities by developing software solutions for spectrometer data management.',
    achievements: [
      'Successfully designed and developed software to capture screenshots of spectrometer readings, enhancing data collection capabilities.',
      'Effectively extracted and structured data into an organized .csv format for further analysis, using fine-tuned PaddleOCR for accurate text recognition.',
      'Showcased ability to manage complex data sets and improve data collection workflows.',
    ],
  },
  {
    company: 'NemHem AI',
    position: 'Intern',
    period: 'Aug 2025 - Dec 2025',
    description: 'Built a Platform of Fine-Tuned LLMs for specific use-cases with also a RAG model.',
    achievements: [
      'Developed a platform integrating multiple fine-tuned Large Language Models (LLMs) tailored for specific use-cases.',
      'Implemented a Retrieval-Augmented Generation (RAG) model to enhance information retrieval and response accuracy.',
      'Collaborated with cross-functional teams to ensure seamless integration and deployment of AI solutions.',
    ],
  },
];

export default function ExperienceSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full overflow-y-auto p-4 sm:p-6 md:p-8"
      style={{ backgroundColor: 'var(--section-bg)' }}
    >
      <div className="max-w-4xl mx-auto" style={{ color: 'var(--macos-text)' }}>
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-8"
          style={{ color: 'var(--heading-text)' }}
        >
          Work Experience
        </motion.h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-[var(--macos-sidebar)] p-6 rounded-xl border border-[var(--macos-border)] hover:border-[var(--macos-accent-blue)] transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Briefcase size={24} className="text-white dark:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: 'var(--heading-text)' }}>{exp.position}</h3>
                    <p className="font-medium" style={{ color: 'var(--macos-accent-blue)' }}>
                      {exp.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[var(--macos-text-secondary)] text-sm">
                  <Calendar size={16} />
                  {exp.period}
                </div>
              </div>

              <p className="text-[var(--macos-text-secondary)] mb-4">
                {exp.description}
              </p>

              <div className="space-y-2">
                <p className="text-sm font-medium text-[var(--macos-text-secondary)]">
                  Key Achievements:
                </p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                      className="flex items-start gap-2 text-sm text-[var(--macos-text-secondary)]"
                    >
                      <span className="text-[var(--macos-accent-green)] mt-1">✓</span>
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
