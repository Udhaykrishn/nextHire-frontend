import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import { GoogleAuthProvider } from "@/providers/google-auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/ui/sonner";
import Providers from "./providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JobHub - Find Your Dream Job",
  description:
    "Connect with top employers and find your perfect career opportunity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <GoogleAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <Providers>{children}</Providers>
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </GoogleAuthProvider>
      </body>
    </html>
  );
}
