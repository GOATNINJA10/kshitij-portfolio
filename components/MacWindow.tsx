"use client";

import { motion } from "framer-motion";
import { X, Minus, Maximize2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isActive?: boolean;
}

export default function MacWindow({ 
  title, 
  children, 
  onClose, 
  onMinimize, 
  onMaximize,
  isActive = true
}: MacWindowProps) {
  const [size, setSize] = useState({ width: 1200, height: 600 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const resizingRef = useRef<string | null>(null);

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    resizingRef.current = direction;

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startPosX = position.x;
    const startPosY = position.y;

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingRef.current) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const newSize = { ...size };
      const newPos = { ...position };

      if (resizingRef.current.includes('right')) {
        newSize.width = Math.max(400, startWidth + deltaX);
      }
      if (resizingRef.current.includes('left')) {
        const newWidth = Math.max(400, startWidth - deltaX);
        if (newWidth > 400) {
          newSize.width = newWidth;
          newPos.x = startPosX + deltaX;
        }
      }
      if (resizingRef.current.includes('bottom')) {
        newSize.height = Math.max(300, startHeight + deltaY);
      }
      if (resizingRef.current.includes('top')) {
        const newHeight = Math.max(300, startHeight - deltaY);
        if (newHeight > 300) {
          newSize.height = newHeight;
          newPos.y = startPosY + deltaY;
        }
      }

      setSize(newSize);
      setPosition(newPos);
    };

    const handleMouseUp = () => {
      resizingRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <motion.div
      ref={windowRef}
      drag
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute md:top-20 top-0 left-0 md:left-1/2 md:-translate-x-1/2 w-full h-full md:w-auto md:h-auto md:rounded-xl overflow-hidden flex flex-col backdrop-blur-xl"
      style={{ 
        width: typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : size.width,
        height: typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : size.height,
        backgroundColor: 'var(--macos-window)',
        border: '1px solid var(--macos-border)',
        boxShadow: isActive 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)' 
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        x: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : position.x,
        y: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : position.y,
      }}
    >
      {/* Combined Title Bar with Navigation */}
      <div 
        className="h-11 backdrop-blur-xl flex items-center justify-between px-3 cursor-grab active:cursor-grabbing"
        style={{ 
          backgroundColor: 'var(--macos-sidebar)',
          borderBottom: '1px solid var(--macos-border)'
        }}
      >
        {/* Left: Traffic Lights + Navigation Arrows */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 group">
            <button
              onClick={(e) => { e.stopPropagation(); onClose?.(); }}
              className="w-3 h-3 rounded-full bg-[var(--macos-accent-red)] flex items-center justify-center hover:brightness-90 transition-all"
            >
              <X size={8} className="opacity-0 group-hover:opacity-100 text-black/50" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onMinimize?.(); }}
              className="w-3 h-3 rounded-full bg-[var(--macos-accent-yellow)] flex items-center justify-center hover:brightness-90 transition-all"
            >
              <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black/50" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onMaximize?.(); }}
              className="w-3 h-3 rounded-full bg-[var(--macos-accent-green)] flex items-center justify-center hover:brightness-90 transition-all"
            >
              <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black/50" />
            </button>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <button 
              className="p-1 rounded transition-colors" 
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--macos-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <ChevronLeft size={16} style={{ color: 'var(--macos-text)', opacity: 0.6 }} />
            </button>
            <button 
              className="p-1 rounded transition-colors" 
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--macos-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <ChevronRight size={16} style={{ color: 'var(--macos-text)', opacity: 0.6 }} />
            </button>
          </div>
        </div>

        {/* Center: Title */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 text-xs font-medium select-none pointer-events-none"
          style={{ color: 'var(--macos-text)', opacity: 0.8 }}
        >
          {title}
        </div>

        {/* Right: Search */}
        <button 
          className="p-1 rounded transition-colors" 
          onClick={(e) => e.stopPropagation()}
          style={{ backgroundColor: 'transparent' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--macos-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Search size={16} style={{ color: 'var(--macos-text)', opacity: 0.6 }} />
        </button>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden relative">
          {children}
      </div>

      {/* Resize Handles */}
      {/* Top */}
      <div
        onMouseDown={(e) => handleResizeStart(e, 'top')}
        className="absolute top-0 left-0 right-0 h-1 cursor-n-resize z-50"
      />
      {/* Bottom */}
      <div
        onMouseDown={(e) => handleResizeStart(e, 'bottom')}
        className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize z-50"
      />
      {/* Left */}
      <div
        onMouseDown={(e) => handleResizeStart(e, 'left')}
        className="absolute top-0 left-0 bottom-0 w-1 cursor-w-resize z-50"
      />
      {/* Right */}
      <div
        onMouseDown={(e) => handleResizeStart(e, 'right')}
        className="absolute top-0 right-0 bottom-0 w-1 cursor-e-resize z-50"
      />
      {/* Top-left corner */}
      <div
        onMouseDown={(e) => handleResizeStart(e, 'top-left')}
        className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize z-50"
      />
      {/* Top-right corner */}
      <div
        onMouseDown={(e) => handleResizeStart(e, 'top-right')}
        className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize z-50"
      />
      {/* Bottom-left corner */}
      <div
        onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
        className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize z-50"
      />
      {/* Bottom-right corner */}
      <div
        onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
        className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-50"
      />
    </motion.div>
  );
}
