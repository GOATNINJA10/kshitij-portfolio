"use client";

import { useState, useEffect } from "react";
import { Search, Wifi, Battery, SlidersHorizontal, Moon, Sun, BatteryCharging, BatteryChargingIcon } from "lucide-react";

export default function MenuBar() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Apply dark mode by default on mount
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time as "9:41 AM"
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
      
      // Format date as "Mon Jun 10"
      const weekday = now.toLocaleDateString("en-US", { weekday: "short" });
      const month = now.toLocaleDateString("en-US", { month: "short" });
      const day = now.getDate();
      setDate(`${weekday} ${month} ${day}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div 
      className="rounded-sm w-full h-8 backdrop-blur-md flex items-center justify-between px-4 text-xs select-none fixed top-0 z-50"
      style={{ 
        backgroundColor: 'var(--menubar-bg)', 
        color: 'var(--menubar-text)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <img src="/images/logo.svg" alt="Logo" className="w-3.5 h-3.5 object-contain" />
        <span className="font-semibold text-xs sm:text-sm">Kshitij&apos;s Portfolio</span>
        <div className="hidden lg:flex gap-4">
          <span 
            className="cursor-pointer transition-opacity" 
            style={{ opacity: 0.8 }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
          >
            Projects
          </span>
          <span 
            className="cursor-pointer transition-opacity" 
            style={{ opacity: 0.8 }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
          >
            About
          </span>
          <span 
            className="cursor-pointer transition-opacity" 
            style={{ opacity: 0.8 }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
          >
            Contact
          </span>
          {/* <span 
            className="cursor-pointer transition-opacity" 
            style={{ opacity: 0.8 }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
          >
            Resume
          </span> */}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden md:flex gap-3 items-center">
            <Wifi size={14} />
            <Search size={14} />
            
            {/* Control Center Toggle */}
            <div className="relative">
              <button 
                onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
                className={`p-1 rounded-md transition-colors ${isControlCenterOpen ? 'bg-black/10' : 'hover:bg-black/5'}`}
              >
                <SlidersHorizontal size={14} />
              </button>

              {/* Control Center Dropdown */}
              {isControlCenterOpen && (
                <div 
                  className="absolute top-8 right-0 w-64 backdrop-blur-xl rounded-xl shadow-2xl p-4 flex flex-col gap-4"
                  style={{ 
                    backgroundColor: 'var(--macos-window)', 
                    border: '1px solid var(--macos-border)',
                    color: 'var(--macos-text)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Display</span>
                  </div>
                  
                  <div 
                    className="rounded-lg p-2 flex items-center justify-between"
                    style={{ backgroundColor: 'var(--macos-sidebar)' }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-500 rounded-full text-white">
                        {isDarkMode ? <Moon size={12} /> : <Sun size={12} />}
                      </div>
                      <span className="font-medium">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                    </div>
                    <button 
                      onClick={toggleTheme}
                      className={`w-10 h-5 rounded-full relative transition-colors ${isDarkMode ? 'bg-blue-500' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${isDarkMode ? 'left-5.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <BatteryChargingIcon size={18} />
        </div>
        
        {/* Mobile theme toggle */}
        <button 
          onClick={toggleTheme}
          className="md:hidden p-1.5 rounded-md hover:bg-black/5 transition-colors"
        >
          {isDarkMode ? <Moon size={14} /> : <Sun size={14} />}
        </button>
        
        <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs">
          <span className="font-medium hidden sm:inline">{date}</span>
          <span className="font-medium">{time}</span>
        </div>
      </div>
    </div>
  );
}
