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
      <body className={`${plusJakartaSans.variable} antialiased font-sans flex flex-col min-h-screen`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <AppLayout>{children}</AppLayout>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
