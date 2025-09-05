import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";


const lexend = Lexend({
  subsets: [ "latin" ],
  variable: "--font-sans",
  weight: [ "300", "400", "500", "600", "700" ],
});


export const metadata: Metadata = {
  title: "Culina - Your Culinary Companion",
  description: "Discover, cook, and save amazing recipes from around the world.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={
          cn(
            "min-h-screen bg-background font-sans antialiased",
            lexend.variable
          )
        }>
          { children }
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
