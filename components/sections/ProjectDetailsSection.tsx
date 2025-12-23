'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface FileItem {
  id: string;
  name: string;
  icon: string;
  type: 'folder' | 'file';
}

const files: FileItem[] = [
  { id: '1', name: 'Full case study', icon: '/images/folder.png', type: 'folder' },
  { id: '2', name: 'Design.fig', icon: '/images/figma.png', type: 'file' },
  { id: '3', name: 'Screenshot.png', icon: '/images/image.png', type: 'file' },
  { id: '4', name: 'converso.com', icon: '/images/safari.png', type: 'file' },
  { id: '5', name: 'TLDR.txt', icon: '/images/txt.png', type: 'file' },
];

export default function ProjectDetailsSection() {
  return (
    <div className="w-full h-full p-4 sm:p-6 md:p-8 overflow-y-auto" style={{ backgroundColor: 'var(--section-bg)' }}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl">
        {files.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
          >
            <div className="w-20 h-20 relative">
              <img
                src={file.icon}
                alt={file.name}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-center font-medium break-all max-w-full" style={{ color: 'var(--macos-text)' }}>
              {file.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
