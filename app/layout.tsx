import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Brain } from "lucide-react"

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearnAI",
  description: "Real-time AI Teaching Platform",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23fe5933' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-5 0v-15A2.5 2.5 0 0 1 9.5 2Z'/%3E%3Cpath d='M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 5 0v-15A2.5 2.5 0 0 0 14.5 2Z'/%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`} suppressHydrationWarning>
        <ClerkProvider appearance={{ variables: { colorPrimary: '#fe5933' }} }>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}