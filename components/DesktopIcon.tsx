"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ContextMenu from "./ContextMenu";

interface DesktopIconProps {
  name: string;
  icon: string;
  position: string; // Tailwind class for positioning (e.g., "top-20 left-20")
  onClick?: () => void;
  isFolder?: boolean;
  id?: string;
  onDragStart?: (id: string, name: string, icon: string) => void;
  onDragEnd?: () => void;
  onDelete?: () => void;
}

export default function DesktopIcon({ name, icon, position, onClick, isFolder = false, id, onDragStart: onDragStartProp, onDragEnd: onDragEndProp, onDelete }: DesktopIconProps) {
  const isDragging = useRef(false);
  const [dragActive, setDragActive] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [isDragEnabled, setIsDragEnabled] = useState(false);
  const dragStartTime = useRef(0);
  const dragDistance = useRef(0);
  const pointerDownTime = useRef(0);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Enable drag only on desktop (>= 768px)
    const checkScreenSize = () => {
      setIsDragEnabled(window.innerWidth >= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDownTime.current = Date.now();
    dragDistance.current = 0;
    
    // Start long press timer for mobile
    if (window.innerWidth < 768) {
      longPressTimer.current = setTimeout(() => {
        setContextMenu({ x: e.clientX, y: e.clientY });
      }, 500); // 500ms long press
    }
  };
  
  const handlePointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const clickDuration = Date.now() - pointerDownTime.current;
    // Only trigger click if it wasn't a drag (short duration AND minimal movement)
    if (!contextMenu && clickDuration < 500 && dragDistance.current < 15) {
      console.log('Click detected on:', name);
      onClick?.();
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };
  
  const handleDragStart = (event: any, info: any) => {
    isDragging.current = true;
    setDragActive(true);
    dragStartTime.current = Date.now();
    dragDistance.current = 0;
    if (id && onDragStartProp) {
      onDragStartProp(id, name, icon);
    }
  };
  
  const handleDragEnd = () => {
    setTimeout(() => { 
      const wasDragging = dragDistance.current > 10;
      isDragging.current = wasDragging;
      setDragActive(false);
      if (onDragEndProp) {
        onDragEndProp();
      }
      // Reset after a delay
      setTimeout(() => {
        isDragging.current = false;
      }, 50);
    }, 100);
  };

  const handleDrag = (event: any, info: any) => {
    // Track drag distance
    dragDistance.current = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    
    // Check if we're over the dock area (bottom of screen)
    const dockElement = document.getElementById('dock');
    if (dockElement && dragActive) {
      const dockRect = dockElement.getBoundingClientRect();
      const { x, y } = info.point;
      
      // Check if cursor is over the dock
      if (x >= dockRect.left && x <= dockRect.right && 
          y >= dockRect.top && y <= dockRect.bottom) {
        // Trigger a custom event that Desktop can listen to
        window.dispatchEvent(new CustomEvent('iconOverDock', { 
          detail: { x, y, id, name, icon } 
        }));
      } else {
        window.dispatchEvent(new CustomEvent('iconLeftDock'));
      }
    }
  };
  
  return (
    <>
      <motion.div
        drag={isDragEnabled}
        dragMomentum={false}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        className={`absolute ${position} flex flex-col items-center gap-1 w-16 sm:w-20 md:w-24 cursor-pointer group`}
        style={{ zIndex: dragActive ? 9999 : 0 }}
      >
      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center">
        <img 
            src={icon} 
            alt={name} 
            className="w-full h-full object-contain drop-shadow-md"
            draggable={false}
        />
      </div>
      <span 
        className="text-[10px] sm:text-xs font-medium px-1 sm:px-2 py-0.5 rounded-md bg-black/0 group-hover:bg-blue-600/80 transition-colors text-center shadow-sm"
        style={{ 
          color: 'var(--desktop-icon-text)',
          textShadow: '0 1px 2px var(--desktop-icon-shadow)'
        }}
      >
        {name}
      </span>
    </motion.div>
    
    <ContextMenu
      x={contextMenu?.x || 0}
      y={contextMenu?.y || 0}
      isVisible={!!contextMenu}
      onClose={() => setContextMenu(null)}
      onOpen={() => {
        console.log('Context menu Open clicked for:', name);
        onClick?.();
      }}
      onDelete={onDelete}
      onCopy={() => console.log('Copy:', name)}
      onInfo={() => console.log('Info:', name)}
    />
    </>
  );
}
