import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../app/components/navbar";
import { Toaster } from "react-hot-toast";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Orchestronic Platform",
  description: "The platform provisioning infrastructure automatically",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header>
            <SignedOut>
              <Navbar />
              <p className="text-center text-5xl font-bold text-white mt-16">
                Welcome to Orchestronic!
              </p>
              {/* Show login button only when the user is signed out */}
              <div className="flex justify-center items-center w-full mt-20">
                <SignInButton mode="modal" className="font-semibold text-xl bg-white text-blue-500 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-500 hover:text-white transition duration-300" />
              </div>
            </SignedOut>
            <SignedIn>
              {/* Show UserButton and Navbar when the user is signed in */}
              <Navbar />
              <Toaster position="top-right" />
              {children}
            </SignedIn>
          </header>
        </body>
      </html>
    </ClerkProvider>
  );
}
