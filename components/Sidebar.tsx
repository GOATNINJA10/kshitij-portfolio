'use client';

import { motion } from 'framer-motion';
import { Folder, FileText, Trash2, Briefcase, User, Image } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onDropToTrash?: () => void;
  isDraggingOver?: boolean;
}

export default function Sidebar({ activeSection, onSectionChange, onDropToTrash, isDraggingOver = false }: SidebarProps) {
  const favorites = [
    { id: 'about-me', label: 'About me', icon: User, color: 'text-purple-500' },
    { id: 'about', label: 'Work', icon: Briefcase, color: 'text-blue-500' },
    { id: 'gallery', label: 'Gallery', icon: Image, color: 'text-pink-500' },
    { id: 'contact', label: 'Contact', icon: FileText, color: 'text-green-500' },
    { id: 'trash', label: 'Trash', icon: Trash2, color: 'text-gray-500', isTrash: true },
  ];

  // const workProjects = [
  //   { id: 'project-1', label: 'Project 1', icon: Folder, color: 'text-orange-400' },
  //   { id: 'project-2', label: 'Project 2', icon: Folder, color: 'text-orange-400' },
  //   { id: 'project-3', label: 'Project 3', icon: Folder, color: 'text-orange-400' },
  //   { id: 'project-4', label: 'Project 4', icon: Folder, color: 'text-orange-400' },
  // ];

  return (
    <div className="w-40 sm:w-44 md:w-48 bg-[var(--macos-sidebar)] backdrop-blur-xl border-r border-[var(--macos-border)] flex flex-col p-2 sm:p-3 space-y-3 sm:space-y-4 select-none">
      <div>
        <h3 className="text-[9px] sm:text-[10px] font-semibold text-[var(--macos-text-secondary)] uppercase tracking-wider px-1 sm:px-2 mb-1.5 sm:mb-2">
          Favorites
        </h3>
        <ul className="space-y-0.5">
          {favorites.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isTrashItem = (item as any).isTrash;
            const isTrashHovered = isTrashItem && isDraggingOver;
            
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: isTrashHovered ? 1.1 : 1
                }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSectionChange(item.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-md cursor-pointer transition-all text-xs sm:text-sm ${
                  isActive 
                    ? 'bg-[var(--macos-accent-blue)]/20 text-[var(--macos-accent-blue)] font-medium' 
                    : isTrashHovered
                    ? 'bg-red-500/30 text-red-400 ring-2 ring-red-500/50'
                    : 'text-[var(--macos-text)] hover:bg-[var(--macos-hover)]'
                }`}
              >
                <Icon size={12} className={`sm:w-3.5 sm:h-3.5 ${item.color}`} />
                <span className="truncate">{item.label}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <div>
        {/* <h3 className="text-[10px] font-semibold text-[var(--macos-text-secondary)] uppercase tracking-wider px-2 mb-2">
          Work
        </h3> */}
        <ul className="space-y-0.5">
          {/* {workProjects.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (favorites.length + index) * 0.05 }}
                onClick={() => onSectionChange(item.id)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-all text-sm ${
                  isActive 
                    ? 'bg-[var(--macos-accent-blue)]/20 text-[var(--macos-accent-blue)] font-medium' 
                    : 'text-[var(--macos-text)] hover:bg-[var(--macos-hover)]'
                }`}
              >
                <Icon size={14} className={item.color} />
                <span>{item.label}</span>
              </motion.li>
            );
          })} */}
        </ul>
      </div>
    </div>
  );
}
