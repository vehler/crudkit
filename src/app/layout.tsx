import type { Metadata } from "next";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider defaultTheme="system" storageKey="crudkit-theme">
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
