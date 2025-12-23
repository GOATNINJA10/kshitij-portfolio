'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe } from 'lucide-react';
import { socials } from '@/app/constants';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'kshitijlm10b@gmail.com',
    link: 'mailto:kshitijlm10b@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'GOATNINJA10',
    link: 'https://github.com/GOATNINJA10',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    link: '#',
  },
];

const getIcon = (text: string) => {
  switch (text.toLowerCase()) {
    case 'github':
      return Github;
    case 'linkedin':
      return Linkedin;
    case 'twitter':
    case 'twitter/x':
      return Twitter;
    case 'email':
      return Mail;
    default:
      return Globe;
  }
};

export default function ContactSection() {
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
          className="text-3xl font-bold mb-8"
          style={{ color: 'var(--heading-text)' }}
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6" style={{ color: 'var(--heading-text)' }}>Contact Information</h3>
            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.label}
                    href={info.link}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-[var(--macos-sidebar)] rounded-xl border border-[var(--macos-border)] hover:border-[var(--macos-accent-blue)] transition-colors"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="sm:w-5 sm:h-5 text-white dark:text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm" style={{ color: 'var(--muted-text)' }}>
                        {info.label}
                      </p>
                      <p className="font-medium text-sm sm:text-base truncate" style={{ color: 'var(--macos-text)' }}>{info.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--heading-text)' }}>Connect With Me</h3>
              <div className="flex gap-4">
                {socials.map((social, index) => {
                  const Icon = getIcon(social.text);
                  return (
                    <motion.a
                      key={social.id}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-lg bg-[var(--macos-sidebar)] border border-[var(--macos-border)] flex items-center justify-center transition-colors hover:bg-[var(--macos-hover)]"
                      style={{ color: social.bg }}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--heading-text)' }}>Send a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--body-text)' }}>Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[var(--macos-sidebar)] border border-[var(--macos-border)] rounded-lg focus:outline-none focus:border-[var(--macos-accent-blue)] transition-colors"
                  placeholder="Your name"
                  style={{ color: 'var(--macos-text)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--body-text)' }}>Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-[var(--macos-sidebar)] border border-[var(--macos-border)] rounded-lg focus:outline-none focus:border-[var(--macos-accent-blue)] transition-colors"
                  placeholder="your.email@example.com"
                  style={{ color: 'var(--macos-text)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--body-text)' }}>Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-[var(--macos-sidebar)] border border-[var(--macos-border)] rounded-lg focus:outline-none focus:border-[var(--macos-accent-blue)] transition-colors resize-none"
                  placeholder="Your message..."
                  style={{ color: 'var(--macos-text)' }}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-[var(--macos-accent-blue)] text-white rounded-lg font-medium hover:brightness-110 transition-all"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
