# 🖥️ Kshitij Bramhecha - Portfolio

A stunning macOS-inspired portfolio website built with Next.js, featuring a fully interactive desktop environment with drag-and-drop functionality, dark/light theme switching, and a responsive design that works seamlessly across all devices.

![Portfolio Preview](public/images/preview.png)

## ✨ Features

### 🎨 **macOS-Style Interface**
- Authentic macOS window design with traffic light controls
- Interactive menu bar with dynamic functionality
- Draggable desktop icons and windows
- Context menu (right-click) support
- Smooth animations and transitions

### 🌓 **Theme System**
- Dark and light mode support
- Persistent theme preference
- No flash of unstyled content (FOUC)
- Smooth theme transitions

### 📱 **Fully Responsive**
- Mobile-first design approach
- Optimized for phones, tablets, and desktops
- Touch-friendly interactions
- Long-press context menu on mobile devices

### 🖼️ **Gallery with IndexedDB**
- Upload images up to 15MB
- Store up to 100MB of images locally
- Persistent storage using IndexedDB
- Drag & drop file upload
- Delete functionality

### 📄 **Interactive Sections**
- **About**: Personal introduction with animated text
- **Experience**: Work history with detailed descriptions
- **Projects**: Showcase of development projects
- **Skills**: Technical skill categorization
- **Terminal**: Interactive command-line interface
- **Gallery**: Image upload and management
- **PDF Viewer**: Resume viewer with download option
- **Contact**: Social links and email contact
- **Trash**: Restore deleted items

### 🎯 **Additional Features**
- Drag & drop functionality for desktop organization
- Scatter text animations
- Smooth scrolling and transitions
- Optimized performance
- SEO-friendly metadata

## 🚀 Tech Stack

### **Framework & Libraries**
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### **Styling & Animation**
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[React Spring](https://www.react-spring.dev/)** - Spring physics animations

### **UI Components**
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[React PDF](https://react-pdf.org/)** - PDF rendering

### **Storage**
- **IndexedDB** - Client-side database for image storage
- **localStorage** - Theme preference storage

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/kshitij-portfolio.git
cd kshitij-portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Build for Production

```bash
npm run build
npm start
```

This creates an optimized production build and starts the server.

## 📂 Project Structure

```
kshitij-portfolio/
├── app/
│   ├── constants/          # Application constants
│   ├── globals.css         # Global styles and CSS variables
│   ├── layout.tsx          # Root layout with theme script
│   └── page.tsx            # Home page
├── components/
│   ├── reactbits/          # Reusable animation components
│   │   ├── CircularText.tsx
│   │   ├── DecayCard.tsx
│   │   ├── SplitText.tsx
│   │   ├── SpotlightCard.tsx
│   │   └── VariableProximity.tsx
│   ├── sections/           # Portfolio sections
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── PDFViewerSection.tsx
│   │   ├── ProjectDetailsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── TerminalSection.tsx
│   │   └── TrashSection.tsx
│   ├── ContextMenu.tsx     # Right-click context menu
│   ├── Desktop.tsx         # Main desktop environment
│   ├── DesktopIcon.tsx     # Draggable icons
│   ├── MacWindow.tsx       # macOS-style window component
│   ├── MenuBar.tsx         # Top menu bar
│   ├── ScatterText.tsx     # Animated text component
│   └── Sidebar.tsx         # Window sidebar navigation
├── lib/
│   └── indexedDB.ts        # IndexedDB utilities
├── public/
│   ├── files/              # Downloadable files (resume, etc.)
│   ├── icons/              # Desktop icons
│   └── images/             # Images and wallpapers
└── README.md
```

## 🎨 Customization

### **Update Personal Information**

1. **Terminal Commands** - Edit `components/sections/TerminalSection.tsx`
2. **About Section** - Edit `components/sections/AboutSection.tsx`
3. **Experience** - Edit `components/sections/ExperienceSection.tsx`
4. **Projects** - Edit `components/sections/ProjectsSection.tsx`
5. **Skills** - Edit `components/sections/SkillsSection.tsx`
6. **Contact** - Edit `components/sections/ContactSection.tsx`

### **Change Theme Colors**

Edit CSS variables in `app/globals.css`:

```css
.dark {
  --background: #1a1a1a;
  --macos-window: #2a2a2a;
  --terminal-bg: #0f1b2d;
  /* ... more variables */
}
```

### **Add Desktop Icons**

1. Add icon image to `public/icons/`
2. Update desktop configuration in `components/Desktop.tsx`

### **Modify Wallpaper**

Replace images in `public/files/` and update paths in `components/Desktop.tsx`

## 🌐 Deployment

### **Vercel (Recommended)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/kshitij-portfolio)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with one click

### **Other Platforms**

This Next.js app can be deployed on any platform that supports Node.js:
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- Self-hosted with `npm run build && npm start`

## 📝 Environment Variables

No environment variables required for basic functionality. Add them as needed for analytics, contact forms, etc.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Kshitij Bramhecha**

- Portfolio: [Your Portfolio URL]
- GitHub: [@GOATNINJA10](https://github.com/GOATNINJA10)
- Email: kshitijlm10b@gmail.com

## 🙏 Acknowledgments

- Inspired from JavaScript Mastery (https://www.youtube.com/JavaScriptMastery)
- Inspired by macOS Big Sur/Monterey design
- Built with Next.js and React
- Icons from [Lucide](https://lucide.dev/)
- Fonts from [Vercel](https://vercel.com/font)


## 🐛 Known Issues

- Safari may require additional IndexedDB configuration
- Some animations may be reduced on low-end devices for performance

## 🗺️ Roadmap

- [ ] Implement contact form with backend
- [ ] Add more interactive terminal commands
- [ ] Cloud storage integration for gallery
- [ ] Multi-language support

---

⭐ If you found this project helpful, please give it a star!

Made with ❤️ by Kshitij Bramhecha
