import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Using system fonts (Google Fonts commented out due to TLS certificate issues in some environments)
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "CRUDKit - Build CRUD Applications at Lightning Speed",
  description: "A shadcn-based component registry for Next.js. Copy, paste, and customize. Build powerful CRUD applications with TypeScript, Tailwind CSS, and best practices.",
  keywords: ["CRUD", "Next.js", "React", "shadcn", "TypeScript", "Tailwind CSS", "components"],
  authors: [{ name: "CRUDKit Team" }],
  openGraph: {
    title: "CRUDKit - Build CRUD Applications at Lightning Speed",
    description: "A shadcn-based component registry for Next.js. Copy, paste, and customize.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
