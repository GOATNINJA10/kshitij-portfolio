'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface CommandOutput {
  command: string;
  output: string[];
}

const COMMANDS = {
  help: {
    output: [
      'Available commands:',
      '  help           - Show this help message',
      '  about          - About me',
      '  skills         - Show my skills',
      '  experience     - Show work experience',
      '  projects       - List my projects',
      '  contact        - Get contact information',
      '  clear / cls    - Clear terminal',
      '  show techstack - Display tech stack table',
      '  github stats   - Show GitHub statistics',
    ],
  },
  about: {
    output: [
      'Hi! I\'m Kshitij Bramhecha',
      'A passionate software engineer specializing in full-stack development.',
      'I build modern web applications with a focus on user experience and performance.',
    ],
  },
  skills: {
    output: [
      'Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Three.js, Framer Motion',
      'Backend: Node.js, Python, FastAPI, AWS Polly, Web Crawling',
      'Tools: Git, GitHub, VS Code, AI/ML, LLM Integration',
    ],
  },
  experience: {
    output: [
      'Intern @ NemHem AI (Aug 2025 - Dec 2025)',
      '  - Built a Platform of Fine-Tuned LLMs for specific use-cases with RAG model',
      '  - Developed platform integrating multiple fine-tuned LLMs',
      '  - Implemented RAG model to enhance information retrieval',
      '',
      'SDE Intern @ Ellipsis Infotech (Jan 2025 - March 2025)',
      '  - Enhanced data collection for spectrometer data management',
      '  - Developed software to capture screenshots of spectrometer readings',
      '  - Used fine-tuned PaddleOCR for accurate text recognition',
    ],
  },
  projects: {
    output: [
      '1. ThreatSentry - Cybersecurity threat detection and monitoring platform',
      '   Tech: React, Next.js, TypeScript, Security APIs',
      '   GitHub: github.com/GOATNINJA10/ThreatSentry',
      '',
      '2. ActiveStride - Sleek eCommerce frontend for active lifestyle enthusiasts',
      '   Tech: React, Next.js, TypeScript, Tailwind CSS',
      '   GitHub: github.com/GOATNINJA10/ActiveStride',
      '',
      '3. ThreeDesign - 3D T-shirt customization web app with real-time visualization',
      '   Tech: Three.js, React, WebGL, AI Design',
      '   GitHub: github.com/KshitijBramhecha/threejs-ai-design',
    ],
  },
  contact: {
    output: [
      'Email: kshitijlm10b@gmail.com',
      'GitHub: github.com/GOATNINJA10',
      'LinkedIn: linkedin.com/in/kshitij-bramhecha-175503243',
      'Location: India',
    ],
  },
};

export default function TerminalSection() {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'welcome',
      output: [
        'Welcome to Kshitij\'s Portfolio Terminal',
        'Type "help" to see available commands',
        '',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when history updates
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (!trimmedCmd) return;

    let output: string[] = [];

    if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
      setHistory([]);
      return;
    }

    if (trimmedCmd === 'show techstack') {
      output = [
        '',
        '    Category              Technologies',
        '    ─────────────────────────────────────────────────────────────',
        '    ✓ Frontend            React, Next, TypeScript',
        '                          Tailwind, Sass, CSS',
        '    ✓ Styling             Tailwind, Sass, CSS',
        '    ✓ Backend             NodeJS, Express, NestJS',
        '    ✓ Database            MongoDB, PostgreSQL',
        '    ✓ Dev Tools           Git, GitHub, Docker',
        '    ─────────────────────────────────────────────────────────────',
        '    ✓ 5 of 5 stacks loaded successfully (100%)',
        '    ▬ Render time: 6ms',
        '',
      ];
    } else if (trimmedCmd === 'github stats') {
      output = [
        '',
        'Loading GitHub statistics...',
        '',
        '📊 GitHub Stats:',
        '   ⭐ Total Stars: 150+',
        '   🔱 Total Forks: 45+',
        '   📦 Public Repos: 32',
        '   👥 Followers: 280+',
        '   📈 Contributions: 1,200+ (this year)',
        '',
      ];
    } else if (COMMANDS[trimmedCmd as keyof typeof COMMANDS]) {
      output = ['', ...COMMANDS[trimmedCmd as keyof typeof COMMANDS].output, ''];
    } else {
      output = ['', `Command not found: ${trimmedCmd}`, 'Type "help" to see available commands', ''];
    }

    setHistory([...history, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full overflow-hidden flex flex-col"
      style={{ backgroundColor: 'var(--terminal-bg)' }}
    >
      {/* Terminal Content */}
      <div
        ref={terminalRef}
        onClick={handleTerminalClick}
        className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 font-mono text-xs sm:text-sm cursor-text"
      >
        {history.map((item, index) => (
          <div key={index} className="mb-4">
            {item.command !== 'welcome' && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-green-600 dark:text-green-400 font-semibold">@kshitij %</span>
                <span style={{ color: 'var(--macos-text)' }}>{item.command}</span>
              </div>
            )}
            <div style={{ color: 'var(--body-text)' }}>
              {item.output.map((line, lineIndex) => {
                // Check if line contains special formatting
                if (line.includes('✓')) {
                  return (
                    <div key={lineIndex} className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span>{line.replace('✓', '').trim()}</span>
                    </div>
                  );
                }
                if (line.includes('▬')) {
                  return (
                    <div key={lineIndex} className="flex items-start gap-2">
                      <span className="text-orange-500 dark:text-yellow-400">▬</span>
                      <span>{line.replace('▬', '').trim()}</span>
                    </div>
                  );
                }
                if (line.includes('Category') || line.includes('─────')) {
                  return (
                    <div key={lineIndex} style={{ color: 'var(--muted-text)' }}>
                      {line}
                    </div>
                  );
                }
                if (line.match(/^\s{4}(Frontend|Styling|Backend|Database|Dev Tools)/)) {
                  const [category, ...tech] = line.split(/\s{2,}/);
                  return (
                    <div key={lineIndex} className="flex gap-4">
                      <span className="text-green-600 dark:text-green-400 w-24 font-semibold">{category.trim()}</span>
                      <span style={{ color: 'var(--body-text)' }}>{tech.join(' ')}</span>
                    </div>
                  );
                }
                // Color coded output
                const coloredLine = line
                  .replace(/successfully/g, '<span class="text-green-600 dark:text-green-400 font-medium">successfully</span>')
                  .replace(/\(100%\)/g, '<span class="text-green-600 dark:text-green-400 font-medium">(100%)</span>')
                  .replace(/📊|⭐|🔱|📦|👥|📈/g, (emoji) => `<span class="text-blue-600 dark:text-blue-400">${emoji}</span>`);
                
                return (
                  <div
                    key={lineIndex}
                    style={{ color: 'var(--body-text)' }}
                    dangerouslySetInnerHTML={{ __html: coloredLine }}
                  />
                );
              })}
            </div>
          </div>
        ))}

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-green-600 dark:text-green-400 font-semibold">@kshitij %</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none"
            style={{ color: 'var(--macos-text)' }}
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </motion.div>
  );
}
