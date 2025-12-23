export const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

export const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

export const dockApps = [
  {
    id: "finder",
    name: "Portfolio",
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Projects",
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery",
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact",
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "resume",
    name: "Resume",
    icon: "pdf.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Trash",
    icon: "trash.png",
    canOpen: true,
  },
];

export const blogPosts = [
  {
    id: 1,
    date: "Nov 20, 2024",
    title: "Building Scalable Web Apps with Next.js 14",
    image: "/images/blog1.png",
    link: "#",
  },
  {
    id: 2,
    date: "Oct 15, 2024",
    title: "Mastering Framer Motion Animations",
    image: "/images/blog2.png",
    link: "#",
  },
  {
    id: 3,
    date: "Sep 10, 2024",
    title: "The Future of React: Server Components",
    image: "/images/blog3.png",
    link: "#",
  },
];

export const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "FastAPI", "AWS Polly", "Web Crawling"],
  },
  {
    category: "Tools & Other",
    items: ["Git", "GitHub", "VS Code", "AI/ML", "LLM Integration"],
  },
];

export const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#333",
    link: "https://github.com/GOATNINJA10",
  },
  {
    id: 2,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#0077b5",
    link: "https://www.linkedin.com/in/kshitij-bramhecha-175503243/",
  },
  {
    id: 4,
    text: "Email",
    icon: "/icons/mail.svg",
    bg: "#ea4335",
    link: "mailto:kshitij@example.com",
  },
];

export const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

export const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
];

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    {
      id: 5,
      name: "ThreatSentry",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[5vh] left-5",
      github: "https://github.com/GOATNINJA10/ThreatSentry",
      children: [
        {
          id: 1,
          name: "Project Details.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A cybersecurity threat detection and monitoring platform for real-time security analysis.",
            "Built with React, Next.js, TypeScript, Security APIs.",
            "Features advanced threat detection, real-time monitoring, and comprehensive security insights.",
          ],
        },
        {
          id: 2,
          name: "Live Demo",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://threat-sentry.vercel.app/",
          position: "top-10 right-20",
        },
      ],
    },
    {
      id: 6,
      name: "ActiveStride",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      github: "https://github.com/GOATNINJA10/ActiveStride",
      children: [
        {
          id: 1,
          name: "Project Details.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "ActiveStride is a sleek and dynamic eCommerce frontend designed to deliver a seamless shopping experience.",
            "Built with React, Next.js, TypeScript, Tailwind CSS.",
            "Created for active lifestyle enthusiasts with modern UI/UX and responsive design.",
          ],
        },
        {
          id: 2,
          name: "Live Demo",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://active-stride.vercel.app",
          position: "top-10 right-20",
        },
      ],
    },
    {
      id: 7,
      name: "ThreeDesign",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-80 left-40",
      windowPosition: "top-[35vh] left-10",
      github: "https://github.com/KshitijBramhecha/threejs-ai-design",
      children: [
        {
          id: 1,
          name: "Project Details.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "A 3D T-shirt customization web app built with Three.js for real-time visualization.",
            "Built with Three.js, React, WebGL, AI Design.",
            "Allows users to design and visualize personalized apparel in an immersive 3D environment.",
          ],
        },
        {
          id: 2,
          name: "Live Demo",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://threejs-ai-design.netlify.app/",
          position: "top-10 right-20",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "profile.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/profile.jpg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Full Stack Web Developer",
      image: "/images/profile.jpg",
      description: [
        "Hi! I'm Kshitij Bramhecha, a Full Stack Web Developer based in India with a passion for code.",
        "I specialize in building modern web applications with 2+ years of experience and 12+ completed projects.",
        "My tech stack includes React, Next.js, Node.js, Python, Three.js, and AI/ML technologies.",
        "I focus on quality, reliable communication, and on-time delivery while turning innovative ideas into real projects that deliver results.",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      href: "/files/resume.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

export const INITIAL_Z_INDEX = 1000;

export const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  trash: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};