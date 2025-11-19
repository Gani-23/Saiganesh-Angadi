'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Briefcase, Code, Mail, Award, Download,
  Linkedin, Phone, MapPin, Calendar,
  Minimize2, Maximize2, X, Folder,
  FileText, Settings, Search, Wifi, Volume2, Battery
} from 'lucide-react';

export default function Windows11Portfolio() {
  const [time, setTime] = useState(new Date());
  const [windows, setWindows] = useState([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [activeWindow, setActiveWindow] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const apps = [
    { id: 'about', name: 'About Me', icon: '👤', bgColor: 'transparent', component: AboutApp },
    { id: 'experience', name: 'Experience', icon: '💼', bgColor: 'transparent', component: ExperienceApp },
    { id: 'skills', name: 'Skills', icon: '⚡', bgColor: 'transparent', component: SkillsApp },
    { id: 'projects', name: 'Projects', icon: '📁', bgColor: 'transparent', component: ProjectsApp },
    { id: 'contact', name: 'Contact', icon: '✉️', bgColor: 'transparent', component: ContactApp },
    { id: 'resume', name: 'Resume', icon: '📄', bgColor: 'transparent', component: ResumeApp },
  ];

  const openWindow = (app) => {
    const existingWindow = windows.find(w => w.id === app.id);
    if (existingWindow) {
      setActiveWindow(app.id);
      return;
    }

    const newWindow = {
      id: app.id,
      ...app,
      x: Math.random() * 150 + 100,
      y: Math.random() * 80 + 50,
      width: 900,
      height: 650,
      minimized: false,
      maximized: false,
    };
    setWindows([...windows, newWindow]);
    setActiveWindow(app.id);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindow === id) {
      setActiveWindow(windows[windows.length - 2]?.id || null);
    }
  };

  const minimizeWindow = (id) => {
    setWindows(windows.map(w => w.id === id ? { ...w, minimized: true } : w));
    setActiveWindow(null);
  };

  const maximizeWindow = (id) => {
    setWindows(windows.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w));
  };

  const restoreWindow = (id) => {
    setWindows(windows.map(w => w.id === id ? { ...w, minimized: false } : w));
    setActiveWindow(id);
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black">
      {/* Windows 11 Bloom Wallpaper */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 ]" />

        {/* Bloom effect - center light burst */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[800px] h-[800px]">
            {/* Center bright spot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl opacity-20" />

            {/* Radiating light beams */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  width: '500px',
                  height: '2px',
                  background: `linear-gradient(to right, rgba(255,255,255,${0.3 - i * 0.02}), transparent)`,
                  transform: `rotate(${i * 30}deg)`,
                  filter: 'blur(2px)'
                }}
              />
            ))}

            {/* Glow layers */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-white/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-300/10 to-transparent rounded-full blur-3xl" />
          </div>
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 space-y-1">
        {apps.slice(0, 4).map((app) => (
          <DesktopIcon key={app.id} app={app} onOpen={openWindow} />
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.filter(w => !w.minimized).map((win) => (
          <Window
            key={win.id}
            window={win}
            isActive={activeWindow === win.id}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onMaximize={() => maximizeWindow(win.id)}
            onFocus={() => setActiveWindow(win.id)}
            setWindows={setWindows}
            windows={windows}
          />
        ))}
      </AnimatePresence>

      {/* Windows 11 Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#202020]/70 backdrop-blur-3xl flex items-center justify-center px-2">
        <div className="flex items-center gap-1">
          {/* Start Button */}
          <motion.button
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className={`h-11 w-12 rounded-md flex items-center justify-center transition-colors ${startMenuOpen ? 'bg-white/10' : ''
              }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect width="8" height="8" fill="#0078D4" rx="1" />
              <rect x="11" width="8" height="8" fill="#0078D4" rx="1" />
              <rect y="11" width="8" height="8" fill="#0078D4" rx="1" />
              <rect x="11" y="11" width="8" height="8" fill="#0078D4" rx="1" />
            </svg>
          </motion.button>

          {/* Search */}
          <motion.button
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            className="h-11 px-4 rounded-md flex items-center gap-2"
          >
            <Search className="w-4 h-4 text-white" />
            <span className="text-white/80 text-sm">Search</span>
          </motion.button>

          {/* Divider */}
          <div className="w-px h-6 bg-white/20 mx-1" />

          {/* Running Apps */}
          {windows.map((win) => (
            <motion.button
              key={win.id}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => win.minimized ? restoreWindow(win.id) : setActiveWindow(win.id)}
              className={`h-11 w-11 rounded-md flex items-center justify-center text-2xl transition-colors relative ${activeWindow === win.id ? 'bg-white/10' : ''
                }`}
            >
              {win.icon}
              {activeWindow === win.id && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#0078D4] rounded-full" />
              )}
            </motion.button>
          ))}
        </div>

        {/* System Tray */}
        <div className="absolute right-2 flex items-center gap-1">
          <motion.button
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            className="h-9 px-2 rounded-md flex items-center gap-2"
          >
            <Wifi className="w-4 h-4 text-white" />
            <Volume2 className="w-4 h-4 text-white" />
            <Battery className="w-4 h-4 text-white" />
          </motion.button>

          <div className="text-white text-xs text-right px-3">
            <div className="font-medium">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
            <div className="text-[10px] text-white/70">{time.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div>
          </div>
        </div>
      </div>

      {/* Windows 11 Start Menu */}
      <AnimatePresence>
        {startMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setStartMenuOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[600px] bg-[#2b2b2b]/95 backdrop-blur-3xl rounded-xl shadow-2xl overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
              }}
            >
              {/* Search Bar */}
              <div className="p-6 pb-4">
                <div className="flex items-center gap-3 bg-[#1f1f1f] rounded-lg px-4 py-3 border border-white/10">
                  <Search className="w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    placeholder="Search for apps, settings, and documents"
                    className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/40"
                  />
                </div>
              </div>

              {/* Pinned Apps */}
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-sm font-semibold">Pinned</h3>
                  <button className="text-white/60 text-xs hover:text-white">All apps →</button>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {apps.map((app, index) => (
                    <motion.button
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        openWindow(app);
                        setStartMenuOpen(false);
                      }}
                      className="flex flex-col items-center gap-2 p-4 rounded-lg transition-colors"
                    >
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shadow-lg"
                        style={{ backgroundColor: app.bgColor }}
                      >
                        {app.icon}
                      </div>
                      <span className="text-white text-xs text-center leading-tight">{app.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Recommended Section */}
              <div className="px-6 pb-6 border-t border-white/10 pt-4">
                <h3 className="text-white text-sm font-semibold mb-3">Recommended</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded bg-[#0078D4] flex items-center justify-center text-lg">📄</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm">Resume.pdf</div>
                      <div className="text-white/50 text-xs">2 hours ago</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#232323]/80 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0078D4] flex items-center justify-center text-lg">
                    👤
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">Saiganesh Angadi</div>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors">
                  <Settings className="w-5 h-5 text-white" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Desktop Icon Component
function DesktopIcon({ app, onOpen }) {
  const [clicks, setClicks] = useState(0);
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setClicks(prev => prev + 1);
    setSelected(true);
    setTimeout(() => setSelected(false), 300);

    if (clicks === 1) {
      onOpen(app);
      setClicks(0);
    }

    setTimeout(() => setClicks(0), 300);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`flex flex-col items-center gap-1.5 p-2 rounded transition-colors w-24 ${selected ? 'bg-white/20' : 'hover:bg-white/10'
        }`}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shadow-lg"
        style={{ backgroundColor: app.bgColor }}
      >
        {app.icon}
      </div>
      <span className="text-white text-xs font-medium text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {app.name}
      </span>
    </motion.button>
  );
}

// Window Component
function Window({ window: win, isActive, onClose, onMinimize, onMaximize, onFocus, setWindows, windows }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (win.maximized) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - win.x,
      y: e.clientY - win.y,
    });
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && !win.maximized) {
        const newX = e.clientX - dragStart.x;
        const newY = Math.max(0, e.clientY - dragStart.y);
        setWindows(windows.map(w => w.id === win.id ? { ...w, x: newX, y: newY } : w));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, win, windows, setWindows]);

  const WindowComponent = win.component;

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        x: win.maximized ? 0 : win.x,
        top: win.maximized ? 0 : win.y,
        width: win.maximized ? '100vw' : win.width,
        height: win.maximized ? 'calc(100vh - 48px)' : win.height,
      }}
      exit={{ opacity: 0, scale: 0.9, y: 50 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className={`absolute rounded-lg overflow-hidden shadow-2xl ${isActive ? 'z-50' : 'z-40'
        }`}
      style={{
        minWidth: 400,
        minHeight: 300,
        backgroundColor: '#1c1c1c',
        border: isActive ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.05)',
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        className="h-10 bg-[#1c1c1c] flex items-center justify-between px-4 cursor-move select-none border-b border-white/5"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-5 h-5 rounded flex items-center justify-center text-sm"
            style={{ backgroundColor: win.bgColor }}
          >
            {win.icon}
          </div>
          <span className="text-white text-xs font-normal">{win.name}</span>
        </div>
        <div className="flex items-center">
          <motion.button
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.9 }}
            onClick={onMinimize}
            className="w-11 h-10 flex items-center justify-center"
          >
            <Minimize2 className="w-3.5 h-3.5 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.9 }}
            onClick={onMaximize}
            className="w-11 h-10 flex items-center justify-center"
          >
            <Maximize2 className="w-3.5 h-3.5 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: 'rgba(196,43,28,1)' }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-11 h-10 flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-40px)] overflow-auto bg-[#1c1c1c]">
        <WindowComponent />
      </div>
    </motion.div>
  );
}

// About App
function AboutApp() {
  return (
    <div className="p-8 text-white bg-[#1c1c1c] min-h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-start gap-6 mb-8">
          <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-[#0078D4] to-[#00BCF2] flex items-center justify-center text-5xl shadow-2xl">
            👤
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">Saiganesh Angadi</h1>
            <p className="text-xl text-[#60CDFF] mb-3">Certified Cloud Solution Architect | DevOps Engineer</p>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                Bengaluru, Karnataka, India
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-6 mb-6 border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-white/80 leading-relaxed mb-4">
            DevOps Engineer with 2 years of experience in designing scalable cloud infrastructure, automating CI/CD pipelines, and establishing robust monitoring systems. Currently at Littardo, I also bring full-stack MERN expertise and cross-platform development skills using Avalonia UI. </p>
          <p className="text-white/80 leading-relaxed">
            My journey in tech has taken me as Software development engineer at Synchronoss Technologies to AI engineering
            at RADiCAL, and even entrepreneurship as CEO of Krushigowrava. I hold multiple certifications including
            AWS Cloud Solutions Architect and Microsoft Azure, demonstrating my commitment to continuous learning
            and excellence in cloud technologies.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0078D4]/20 rounded-xl p-5 border border-[#0078D4]/30">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="font-semibold mb-1">Certifications</h3>
            <p className="text-sm text-white/70">AWS, Azure, DevOps</p>
          </div>
          <div className="bg-[#8764B8]/20 rounded-xl p-5 border border-[#8764B8]/30">
            <div className="text-3xl mb-2">💼</div>
            <h3 className="font-semibold mb-1">Experience</h3>
            <p className="text-sm text-white/70">2+ Years in Tech</p>
          </div>
          <div className="bg-[#00B7C3]/20 rounded-xl p-5 border border-[#00B7C3]/30">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold mb-1">Expertise</h3>
            <p className="text-sm text-white/70">Cloud & DevOps, Software Development</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Experience App
function ExperienceApp() {
  const experiences = [
    {
      company: 'Littardo',
      role: 'Senior DevOps Engineer',
      period: 'January 2025 - Present',
      location: 'Bhubaneshwar, Odisha, India',
      icon: '💼',
      color: 'transparent',
    },
    {
      company: 'Krushigowrava',
      role: 'Chief Executive Officer',
      period: 'February 2024 - December 2024',
      location: 'Tumakuru, Karnataka, India',
      icon: '👔',
      color: 'transparent',
    },
    {
      company: 'RADiCAL',
      role: 'AI Engineering Intern',
      period: 'October 2023 - February 2024',
      location: 'New York, United States',
      icon: '🤖',
      color: 'transparent',
    },
    {
      company: 'Synchronoss Technologies',
      role: 'Software Development Engineer',
      period: 'January 2023 - September 2023',
      location: 'Bengaluru, Karnataka, India',
      icon: '💻',
      color: 'transparent',
    },
  ];

  return (
    <div className="p-8 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Professional Experience</h1>

        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#2b2b2b] rounded-xl p-6 hover:bg-[#333333] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: exp.color }}
                >
                  {exp.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                  <p className="text-lg text-[#60CDFF] mb-2">{exp.company}</p>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-[#0078D4]/20 rounded-xl p-6 border border-[#0078D4]/30">
          <h2 className="text-2xl font-semibold mb-4">🎓 Education</h2>
          <div className="flex items-center gap-10">

            <div>
              <h3 className="text-lg font-semibold">DevOps and Cloud Engineering</h3>
              <p className="text-white/70">Hero Vired</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Bachelor of Engineering - Computer Science</h3>
              <p className="text-white/70">Visvesvaraya Technological University</p>
            </div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}

// Skills App
function SkillsApp() {
  const skillCategories = [
    {
      name: 'Cloud Platforms',
      icon: '☁️',
      color: '#0078D4',
      skills: ['AWS', 'Microsoft Azure', 'Cloud Services', 'Cloud Architecture']
    },
    {
      name: 'DevOps & Tools',
      icon: '⚙️',
      color: '#8764B8',
      skills: ['Git', 'Github Actions', 'CI/CD', 'Terraform', 'Docker', 'Kubernetes', 'Jenkins', 'Argo CD', 'Grafana', 'Prometheus']
    },
    {
      name: 'Development',
      icon: '💻',
      color: '#00B7C3',
      skills: ['Python', 'Node.js', 'React', 'Next', 'MongoDB', 'Express', 'Avalonia UI']
    },
    {
      name: 'Certifications',
      icon: '🏆',
      color: '#FFB900',
      skills: ['AWS Solutions Architect', 'Azure AZ-900', 'DevOps Certificate', 'Kubernetes']
    }
  ];

  return (
    <div className="p-8 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Skills & Expertise</h1>

        <div className="grid grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#2b2b2b] rounded-xl p-6"
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-4 text-lg font-semibold"
                style={{ backgroundColor: `${category.color}30`, color: category.color }}
              >
                <span className="text-2xl">{category.icon}</span>
                {category.name}
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-white/10 rounded-md text-sm text-white/90 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-[#0078D4]/20 to-[#8764B8]/20 rounded-xl p-6 border border-white/10">
          <h2 className="text-2xl font-semibold mb-6">Core Competencies</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#60CDFF] mb-2">2+</div>
              <div className="text-white/70">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#C19DFF] mb-2">4+</div>
              <div className="text-white/70">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#60FFCD] mb-2">10+</div>
              <div className="text-white/70">Technologies</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Projects App
function ProjectsApp() {
  const projects = [
    {
      name: 'Cloud Infrastructure Automation',
      description: 'Built scalable cloud infrastructure using AWS and Terraform for automated deployments',
      tech: ['AWS', 'Azure', 'Terraform', 'Kubernetes'],
      icon: '☁️',
      color: 'transparent'
    },
    {
      name: 'CI/CD Pipeline Implementation',
      description: 'Designed and implemented comprehensive CI/CD pipelines for microservices architecture',
      tech: ['Github Actions', 'Jenkins', 'Ansible'],
      icon: '🔄',
      color: 'transparent'
    },
    {
      name: 'Container Orchestration',
      description: 'Managed Kubernetes clusters for high-availability production environments',
      tech: ['Kubernetes', 'Docker', 'Helm'],
      icon: '🐳',
      color: 'transparent'
    },
    {
      name: 'AI Model Deployment',
      description: 'Deployed machine learning models with automated scaling and monitoring',
      tech: ['Python', 'TensorFlow', 'AWS'],
      icon: '🤖',
      color: 'transparent'
    }
  ];

  return (
    <div className="p-8 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Featured Projects</h1>

        <div className="grid grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#2b2b2b] rounded-xl p-6 hover:bg-[#333333] transition-all cursor-pointer"
            >
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center text-3xl mb-4"
                style={{ backgroundColor: project.color }}
              >
                {project.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-white/70 text-sm mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/10 rounded-md text-xs text-white/80 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Contact App
function ContactApp() {
  return (
    <div className="p-8 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Get In Touch</h1>

        <div className="bg-[#2b2b2b] rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

          <div className="space-y-3">
            <motion.a
              href="mailto:saiganesh7989@gmail.com"
              whileHover={{ scale: 1.01, backgroundColor: '#333333' }}
              className="flex items-center gap-4 p-4 bg-[#252525] rounded-lg transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-[#E74856] flex items-center justify-center text-2xl">
                ✉️
              </div>
              <div>
                <div className="text-sm text-white/60">Email</div>
                <div className="font-medium">saiganesh7989@gmail.com</div>
              </div>
            </motion.a>

            <motion.a
              href="tel:9182345999"
              whileHover={{ scale: 1.01, backgroundColor: '#333333' }}
              className="flex items-center gap-4 p-4 bg-[#252525] rounded-lg transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-[#107C10] flex items-center justify-center text-2xl">
                📱
              </div>
              <div>
                <div className="text-sm text-white/60">Phone</div>
                <div className="font-medium">+91 9182345999</div>
              </div>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/gani23"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01, backgroundColor: '#333333' }}
              className="flex items-center gap-4 p-4 bg-[#252525] rounded-lg transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-[#0078D4] flex items-center justify-center text-2xl">
                💼
              </div>
              <div>
                <div className="text-sm text-white/60">LinkedIn</div>
                <div className="font-medium">linkedin.com/in/gani23</div>
              </div>
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.01, backgroundColor: '#333333' }}
              className="flex items-center gap-4 p-4 bg-[#252525] rounded-lg"
            >
              <div className="w-12 h-12 rounded-lg bg-[#8764B8] flex items-center justify-center text-2xl">
                📍
              </div>
              <div>
                <div className="text-sm text-white/60">Location</div>
                <div className="font-medium">Bengaluru, Karnataka, India</div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.a
            href="https://www.linkedin.com/in/gani23"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-[#0078D4] rounded-lg font-semibold shadow-lg"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn Profile
          </motion.a>
          <motion.a
            href="mailto:saiganesh7989@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-[#8764B8] rounded-lg font-semibold shadow-lg"
          >
            <Mail className="w-5 h-5" />
            Send Email
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}

// Resume App
function ResumeApp() {
  return (
    <div className="p-8 text-white bg-[#1c1c1c] min-h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Resume</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-[#0078D4] rounded-lg font-semibold shadow-lg"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </motion.button>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-8 space-y-6 border border-white/10">
          <div className="border-b border-white/10 pb-6">
            <h2 className="text-3xl font-bold mb-2">Saiganesh Angadi</h2>
            <p className="text-xl text-[#60CDFF] mb-3">Certified Cloud Solution Architect | DevOps Engineer</p>
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <span>✉️ saiganesh7989@gmail.com</span>
              <span>📱 +91 9182345999</span>
              <span>📍 Bengaluru, Karnataka</span>
              <span>🔗 linkedin.com/in/gani23</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3 text-[#60CDFF]">🏆 Certifications</h3>
            <ul className="space-y-2 text-white/80">
              <li>• AWS Cloud Solutions Architect Specialization</li>
              <li>• Microsoft Certified: Azure (AZ-900)</li>
              <li>• Certificate Program in DevOps and Cloud Engineering</li>
              <li>• Kubernetes Certification</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3 text-[#60CDFF]">💻 Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['MEAN Stack', 'Microsoft Azure', 'Cloud Services', 'AWS', 'Kubernetes', 'DevOps'].map((skill, idx) => (
                <span key={idx} className="px-4 py-2 bg-[#0078D4]/20 rounded-lg text-sm border border-[#0078D4]/30">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3 text-[#60CDFF]">💼 Experience Highlights</h3>
            <div className="space-y-3 text-white/80">
              <div>
                <strong className="text-white">DevOps Engineer</strong> at Littardo (2025 - Present)
              </div>
              <div>
                <strong className="text-white">CEO</strong> at Krushigowrava (2024)
              </div>
              <div>
                <strong className="text-white">AI Engineering Intern</strong> at RADiCAL (2023-2024)
              </div>
              <div>
                <strong className="text-white">Software Engineer</strong> at Synchronoss Technologies (2023)
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3 text-[#60CDFF]">🎓 Education</h3>
            <p className="text-white/80">
              <strong className="text-white">Bachelor of Engineering</strong> - Computer Science<br />
              Visvesvaraya Technological University
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}