"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dockApps, WINDOW_CONFIG } from "@/app/constants";
import MacWindow from "./MacWindow";
import Sidebar from "./Sidebar";
import MenuBar from "./MenuBar";
import DesktopIcon from "./DesktopIcon";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import ExperienceSection from "./sections/ExperienceSection";
import ContactSection from "./sections/ContactSection";
import ProjectDetailsSection from "./sections/ProjectDetailsSection";
import GallerySection from "./sections/GallerySection";
import TrashSection from "./sections/TrashSection";
import TerminalSection from "./sections/TerminalSection";
import PDFViewerSection from "./sections/PDFViewerSection";
import VariableProximity from "./reactbits/VariableProximity";

// Helper to get initial section for an app
const getInitialSection = (appId: string) => {
  switch (appId) {
    case "finder": return "about-me";
    case "safari": return "projects";
    case "terminal": return "terminal";
    case "contact": return "contact";
    case "photos": return "gallery";
    case "trash": return "trash";
    case "resume": return "resume";
    default: return "about-me";
  }
};

const getComponentForSection = (sectionId: string, trashedItems: any[], restoreFromTrash: (id: string) => void, emptyTrash: () => void) => {
  switch (sectionId) {
    case "about": return <ExperienceSection />;
    case "about-me": return <AboutSection />;
    case "gallery": return <GallerySection />;
    case "projects": return <ProjectsSection />;
    case "project-1": return <ProjectDetailsSection />;
    case "project-2": return <ProjectDetailsSection />;
    case "project-3": return <ProjectDetailsSection />;
    case "project-4": return <ProjectDetailsSection />;
    case "terminal": return <SkillsSection />;
    case "contact": return <ContactSection />;
    case "experience": return <ExperienceSection />;
    case "experience-1": return <ExperienceSection />;
    case "experience-2": return <ExperienceSection />;
    case "experience-3": return <ExperienceSection />;
    case "experience-4": return <ExperienceSection />;
    case "trash": return <TrashSection items={trashedItems} onRestore={restoreFromTrash} onEmpty={emptyTrash} />;
    case "resume": return <PDFViewerSection />;
    default: return <AboutSection />;
  }
};

const getTitleForSection = (sectionId: string) => {
  switch (sectionId) {
    case "about": return "Work";
    case "about-me": return "About me";
    case "gallery": return "Gallery";
    case "project-1": return "Project 1";
    case "project-2": return "Project 2 - Converso";
    case "project-3": return "Project 3";
    case "project-4": return "Project 4";
    case "projects": return "Projects";
    case "terminal": return "Terminal";
    case "contact": return "Contact";
    case "experience": return "Experience";
    case "experience-1": return "Senior Developer";
    case "experience-2": return "Full Stack Engineer";
    case "experience-3": return "Software Engineer";
    case "experience-4": return "Junior Developer";
    case "trash": return "Trash";
    case "resume": return "Resume.pdf";
    default: return "Finder";
  }
};

export default function Desktop() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [trashedItems, setTrashedItems] = useState<Array<{id: string, name: string, icon: string}>>([]);
  const [draggingItem, setDraggingItem] = useState<{id: string, name: string, icon: string} | null>(null);
  const [isDraggingOverTrash, setIsDraggingOverTrash] = useState(false);

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Set initial state
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    return () => observer.disconnect();
  }, []);

  // Listen for dock hover events from DesktopIcon
  useEffect(() => {
    const handleIconOverDock = (e: any) => {
      const { x, y } = e.detail;
      // Find trash icon position
      const dockIcons = document.querySelectorAll('.dock-icon');
      const filteredDockApps = dockApps.filter(app => app.id !== 'resume');
      dockIcons.forEach((icon, index) => {
        const app = filteredDockApps[index];
        if (app && app.id === 'trash') {
          const rect = icon.getBoundingClientRect();
          if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            setIsDraggingOverTrash(true);
          }
        }
      });
    };

    const handleIconLeftDock = () => {
      setIsDraggingOverTrash(false);
    };

    window.addEventListener('iconOverDock', handleIconOverDock);
    window.addEventListener('iconLeftDock', handleIconLeftDock);

    return () => {
      window.removeEventListener('iconOverDock', handleIconOverDock);
      window.removeEventListener('iconLeftDock', handleIconLeftDock);
    };
  }, []);

  // State to track windows. Key is appId.
  const [windowStates, setWindowStates] = useState<Record<string, {
    isOpen: boolean;
    zIndex: number;
    activeSection: string;
  }>>(() => {
    const initialStates: Record<string, {
      isOpen: boolean;
      zIndex: number;
      activeSection: string;
    }> = {};
    Object.keys(WINDOW_CONFIG).forEach(key => {
        initialStates[key] = {
            isOpen: WINDOW_CONFIG[key as keyof typeof WINDOW_CONFIG].isOpen,
            zIndex: WINDOW_CONFIG[key as keyof typeof WINDOW_CONFIG].zIndex,
            activeSection: getInitialSection(key)
        };
    });
    return initialStates;
  });

  const [maxZIndex, setMaxZIndex] = useState(1000);

  const openWindow = (appId: string) => {
    console.log('openWindow called for:', appId);
    console.log('Current windowStates:', windowStates);
    setWindowStates(prev => {
      const newState = {
        ...prev,
        [appId]: {
          ...prev[appId],
          isOpen: true,
          zIndex: maxZIndex + 1,
          activeSection: prev[appId]?.activeSection || getInitialSection(appId)
        }
      };
      console.log('New windowStates:', newState);
      return newState;
    });
    setMaxZIndex(prev => prev + 1);
  };

  const closeWindow = (appId: string) => {
    setWindowStates(prev => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isOpen: false,
        activeSection: getInitialSection(appId) // Reset to initial section when closing
      }
    }));
  };

  const focusWindow = (appId: string) => {
    setWindowStates(prev => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        zIndex: maxZIndex + 1
      }
    }));
    setMaxZIndex(prev => prev + 1);
  };

  const handleSectionChange = (appId: string, section: string) => {
    setWindowStates(prev => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        activeSection: section
      }
    }));
  };

  const moveToTrash = (itemId: string, itemName: string, itemIcon: string) => {
    setTrashedItems(prev => [...prev, { id: itemId, name: itemName, icon: itemIcon }]);
    setDraggingItem(null);
    setIsDraggingOverTrash(false);
  };

  const restoreFromTrash = (itemId: string) => {
    setTrashedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const emptyTrash = () => {
    setTrashedItems([]);
  };

  const handleDragStart = (id: string, name: string, icon: string) => {
    setDraggingItem({ id, name, icon });
  };

  const handleDragEnd = () => {
    if (isDraggingOverTrash && draggingItem) {
      moveToTrash(draggingItem.id, draggingItem.name, draggingItem.icon);
    }
    setDraggingItem(null);
    setIsDraggingOverTrash(false);
  };

  const desktopItems = [
    { id: "resume", name: "Resume.pdf", icon: "/images/pdf.png", position: "top-24 left-10", isFolder: false, action: () => { console.log('Opening resume'); openWindow("resume"); } },
    { id: "proj1", name: "Project 1", icon: "/images/folder.png", position: "top-24 right-10", isFolder: true, action: () => openWindow("safari") },
    { id: "proj2", name: "Project 2", icon: "/images/folder.png", position: "top-52 right-10", isFolder: true, action: () => openWindow("safari") },
    { id: "proj3", name: "Project 3", icon: "/images/folder.png", position: "top-80 right-10", isFolder: true, action: () => openWindow("safari") },
  ];

  return (
    <main 
      className="w-screen h-screen overflow-hidden relative transition-all duration-500" 
      style={isDarkMode ? { 
        backgroundImage: 'url("/files/macos.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : { 
        backgroundImage: 'url("/images/wallpaper.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Light mode overlay */}
      {!isDarkMode && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'brightness(1.3) saturate(0.8)',
            zIndex: 0
          }}
        />
      )}
      
      <MenuBar />

      {/* Desktop Icons - visible on all screens */}
      {desktopItems
        .filter(item => !trashedItems.some(trashed => trashed.id === item.id))
        .map((item) => (
        <DesktopIcon
          key={item.id}
          id={item.id}
          name={item.name}
          icon={item.icon}
          position={item.position}
          isFolder={item.isFolder}
          onClick={item.action}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDelete={() => moveToTrash(item.id, item.name, item.icon)}
        />
      ))}

      {/* Center Welcome Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center select-none z-0 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pointer-events-auto flex flex-col items-center gap-2"
          style={{ color: 'var(--welcome-text)' }}
        >
          <motion.p
            className="text-2xl sm:text-3xl md:text-5xl font-light"
            whileHover={{ scale: 1.05 }}
          >
            Hey, Welcome to My
          </motion.p>
          <motion.p
            className="text-3xl sm:text-4xl md:text-6xl font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            Portfolio
          </motion.p>
        </motion.div>
      </div>

      {/* Windows */}
      <AnimatePresence>
        {Object.entries(windowStates)
          .filter(([_, state]) => state.isOpen)
          .map(([appId, state]) => {
            const app = dockApps.find(a => a.id === appId);
            if (!app) return null;

            // Terminal and Resume should display without sidebar
            const isTerminal = appId === 'terminal';
            const isResume = appId === 'resume';
            const noSidebar = isTerminal || isResume;

            return (
              <div
                  key={appId}
                  className="absolute inset-0 pointer-events-none"
                  style={{ zIndex: state.zIndex }}
              >
                  <div className="pointer-events-auto w-full h-full" onMouseDown={() => focusWindow(appId)}>
                      <MacWindow
                          title={noSidebar ? getTitleForSection(state.activeSection) : getTitleForSection(state.activeSection)}
                          onClose={() => closeWindow(appId)}
                          onMinimize={() => closeWindow(appId)}
                          onMaximize={() => {}}
                          isActive={state.zIndex === maxZIndex}
                      >
                          {noSidebar ? (
                            appId === 'terminal' ? <TerminalSection /> : <PDFViewerSection />
                          ) : (
                            <div className="flex h-full w-full overflow-hidden"
                              onDragOver={(e) => {
                                e.preventDefault();
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                if (x < 200 && draggingItem) {
                                  setIsDraggingOverTrash(true);
                                } else {
                                  setIsDraggingOverTrash(false);
                                }
                              }}
                              onDragLeave={() => setIsDraggingOverTrash(false)}
                              onDrop={(e) => {
                                e.preventDefault();
                                handleDragEnd();
                              }}
                            >
                              <Sidebar 
                                  activeSection={state.activeSection} 
                                  onSectionChange={(section) => handleSectionChange(appId, section)}
                                  isDraggingOver={isDraggingOverTrash}
                              />
                              <div className="flex-1 overflow-y-auto">
                                  {getComponentForSection(state.activeSection, trashedItems, restoreFromTrash, emptyTrash)}
                              </div>
                            </div>
                          )}
                      </MacWindow>
                  </div>
              </div>
            );
          })}
      </AnimatePresence>

      {/* Dock */}
      <div id="dock" className="hidden md:block">
        <div className="dock-container">
          {dockApps.filter(app => app.id !== 'resume').map((app) => {
            const isTrash = app.id === 'trash';
            const isTrashHovered = isTrash && isDraggingOverTrash;
            
            return (
              <motion.div
                key={app.id}
                className="dock-icon relative group"
                onClick={() => app.canOpen && openWindow(app.id)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{ 
                  scale: isTrashHovered ? 1.3 : 1,
                  rotate: isTrashHovered ? [0, -10, 10, -10, 10, 0] : 0
                }}
                transition={{ duration: 0.3 }}
                onDragOver={(e) => {
                  if (isTrash && draggingItem) {
                    e.preventDefault();
                    setIsDraggingOverTrash(true);
                  }
                }}
                onDragLeave={() => {
                  if (isTrash) {
                    setIsDraggingOverTrash(false);
                  }
                }}
                onDrop={(e) => {
                  if (isTrash) {
                    e.preventDefault();
                    handleDragEnd();
                  }
                }}
                style={{
                  filter: isTrashHovered ? 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.6))' : 'none'
                }}
              >
                <img src={`/images/${app.icon}`} alt={app.name} className="w-full h-full object-contain" />
                
                {windowStates[app.id]?.isOpen && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-black/50 rounded-full" />
                )}
                
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                  {app.name}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/20 dark:bg-black/20 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center justify-around py-3 px-2">
          {dockApps.filter(app => app.id !== 'resume' && app.id !== 'terminal').map((app) => (
            <button
              key={app.id}
              onClick={() => app.canOpen && openWindow(app.id)}
              className="flex flex-col items-center gap-1 relative"
            >
              <img 
                src={`/images/${app.icon}`} 
                alt={app.name} 
                className="w-10 h-10 object-contain"
              />
              {windowStates[app.id]?.isOpen && (
                <div className="w-1 h-1 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
