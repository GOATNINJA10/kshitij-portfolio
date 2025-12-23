import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kshitij Bramhecha - Software Engineer Portfolio",
  description: "Portfolio of Kshitij Bramhecha, a passionate software engineer specializing in full-stack development, web applications, and desktop solutions.",
  keywords: ["Kshitij Bramhecha", "Software Engineer", "Full Stack Developer", "Portfolio", "Web Development"],
  authors: [{ name: "Kshitij Bramhecha" }],
  openGraph: {
    title: "Kshitij Bramhecha - Software Engineer Portfolio",
    description: "Portfolio showcasing projects and skills in full-stack development",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
