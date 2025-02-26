import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../app/components/navbar";
import { Toaster } from "react-hot-toast";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { Provider } from "../app/components/ConText";
import { homePage as HomePage } from "../app/page.js";

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
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <Provider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {/* Signed-In Users */}
            <SignedIn>
              <Navbar />
              <Toaster position="top-right" />
              {children}
            </SignedIn>

            {/* Signed-Out Users */}
            <SignedOut>
              <homePage />
            </SignedOut>
          </body>
        </Provider>
      </html>
    </ClerkProvider>
  );
}
