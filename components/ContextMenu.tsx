'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Copy, Info, FolderOpen } from 'lucide-react';
import { useEffect } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onDelete?: () => void;
  onCopy?: () => void;
  onInfo?: () => void;
  onOpen?: () => void;
  isVisible: boolean;
}

export default function ContextMenu({ 
  x, 
  y, 
  onClose, 
  onDelete, 
  onCopy, 
  onInfo, 
  onOpen, 
  isVisible 
}: ContextMenuProps) {
  useEffect(() => {
    const handleClick = () => onClose();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isVisible) {
      document.addEventListener('click', handleClick);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, onClose]);

  const menuItems = [
    { icon: FolderOpen, label: 'Open', action: onOpen },
    { icon: Copy, label: 'Copy', action: onCopy },
    { icon: Info, label: 'Get Info', action: onInfo },
    { divider: true },
    { icon: Trash2, label: 'Move to Trash', action: onDelete, danger: true },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          className="fixed bg-[var(--macos-sidebar)] backdrop-blur-xl border border-[var(--macos-border)] rounded-lg shadow-2xl py-1 min-w-[180px]"
          style={{
            left: x,
            top: y,
            zIndex: 10000,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {menuItems.map((item, index) => {
            if (item.divider) {
              return (
                <div
                  key={`divider-${index}`}
                  className="my-1 border-t border-[var(--macos-border)]"
                />
              );
            }

            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                whileHover={{ backgroundColor: 'var(--macos-hover)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  item.action?.();
                  onClose();
                }}
                className="w-full px-3 py-1.5 flex items-center gap-3 text-sm transition-colors text-left"
                style={{
                  color: item.danger ? '#ef4444' : 'var(--macos-text)',
                }}
              >
                {Icon && <Icon size={14} />}
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
