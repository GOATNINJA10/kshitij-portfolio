'use client';

import { ExternalLink, Github } from 'lucide-react';
import { locations } from '@/app/constants';

// Helper to extract project data from the file system structure
interface ProjectFile {
  name: string;
  fileType?: string;
  description?: string[];
  href?: string;
}

interface ProjectFolder {
  name: string;
  github?: string;
  children?: ProjectFile[];
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  demo: string;
}

const getProjects = (): Project[] => {
  const workFolder = locations.work;
  if (!workFolder || !workFolder.children) return [];

  return workFolder.children.map((projectFolder: ProjectFolder) => {
    const detailsFile = projectFolder.children?.find((file: ProjectFile) => 
      file.name.endsWith('.txt')
    );
    
    const linkFile = projectFolder.children?.find((file: ProjectFile) => 
      file.fileType === 'url'
    );

    const description = detailsFile?.description?.[0] || 'No description available.';
    // Try to extract tech stack from description or provide defaults
    const techStackText = detailsFile?.description?.find((line: string) => 
      line.includes('Built with') || line.includes('tech stack')
    );
    
    let tech = ['React', 'Next.js']; // Default
    if (techStackText) {
      // Simple extraction: remove "Built with " and split by comma
      const cleanText = techStackText.replace('Built with ', '').replace('.', '');
      tech = cleanText.split(',').map((t: string) => t.trim());
    }

    return {
      title: projectFolder.name,
      description: description,
      tech: tech,
      image: '📂', // Using folder icon as placeholder since we don't have the images
      github: projectFolder.github || '#',
      demo: linkFile?.href || '#',
    };
  });
};

export default function ProjectsSection() {
  const projects = getProjects();

  return (
    <div
      className="h-full overflow-y-auto p-4 sm:p-6 md:p-8"
      style={{ backgroundColor: 'var(--section-bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
          style={{ color: 'var(--heading-text)' }}
        >
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project: Project, index: number) => (
            <div
              key={project.title}
              className="h-full"
            >
              <div className="bg-[var(--macos-sidebar)] rounded-xl border border-[var(--macos-border)] overflow-hidden h-full flex flex-col hover:border-[var(--macos-accent-blue)] transition-colors">
                {/* Project Image/Icon */}
                <div className="h-40 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center text-6xl">
                  {project.image}
                </div>

                {/* Project Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--heading-text)' }}>{project.title}</h3>
                  <p className="text-sm mb-4 line-clamp-2 flex-1" style={{ color: 'var(--body-text)' }}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech: string) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-md"
                        style={{ 
                          backgroundColor: 'var(--skill-badge-bg)',
                          color: 'var(--skill-badge-text)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[var(--macos-hover)] rounded-lg text-sm hover:bg-[var(--macos-active)] transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[var(--macos-accent-blue)] rounded-lg text-sm hover:brightness-110 transition-all"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
