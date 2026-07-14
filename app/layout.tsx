import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AppLayout } from "../components/layout/AppLayout";
import { QueryProvider } from "../providers/QueryProvider";
import { ThemeProvider } from "../providers/ThemeProvider";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "cGxP Directory",
  description: "Discover, connect, and advance life sciences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} antialiased font-sans flex flex-col min-h-screen transition-colors duration-500`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem themes={['light', 'dark', 'ocean', 'forest', 'sunset']}>
          {/* Dark Theme Background Glows */}
          <div className="fixed inset-0 z-[-1] hidden dark:block bg-[#0B132B] pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
          </div>
          
          <QueryProvider>
            <AppLayout>{children}</AppLayout>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
