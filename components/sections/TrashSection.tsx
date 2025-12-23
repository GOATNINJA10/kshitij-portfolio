'use client';

import { Trash2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrashSectionProps {
  items: Array<{id: string, name: string, icon: string}>;
  onRestore: (id: string) => void;
  onEmpty: () => void;
}

export default function TrashSection({ items = [], onRestore, onEmpty }: TrashSectionProps) {
  if (items.length === 0) {
    return (
      <div
        className="h-full overflow-y-auto p-4 sm:p-6 md:p-8 flex items-center justify-center"
        style={{ backgroundColor: 'var(--section-bg)' }}
      >
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[var(--macos-sidebar)] border border-[var(--macos-border)] flex items-center justify-center">
              <Trash2 size={48} className="sm:w-16 sm:h-16 text-[var(--macos-text-secondary)] opacity-30" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2" style={{ color: 'var(--heading-text)' }}>
            No Items in Trash
          </h2>
          <p className="text-sm sm:text-base text-[var(--macos-text-secondary)]">
            Trash is empty
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-full overflow-y-auto p-4 sm:p-6 md:p-8"
      style={{ backgroundColor: 'var(--section-bg)' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold" style={{ color: 'var(--heading-text)' }}>
            Trash ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h2>
          <button
            onClick={onEmpty}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg text-xs sm:text-sm font-medium transition-colors"
          >
            Empty Trash
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-[var(--macos-sidebar)] rounded-xl border border-[var(--macos-border)] hover:border-[var(--macos-accent-blue)] transition-colors group"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <span className="text-[10px] sm:text-xs text-center truncate w-full" style={{ color: 'var(--macos-text)' }}>
                {item.name}
              </span>
              <button
                onClick={() => onRestore(item.id)}
                className="flex items-center gap-1 px-2 py-1 sm:px-3 bg-[var(--macos-accent-blue)]/20 hover:bg-[var(--macos-accent-blue)]/30 text-[var(--macos-accent-blue)] rounded-md text-[10px] sm:text-xs font-medium transition-colors md:opacity-0 md:group-hover:opacity-100"
              >
                <RotateCcw size={10} className="sm:w-3 sm:h-3" />
                <span>Restore</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
