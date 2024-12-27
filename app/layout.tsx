import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Inter } from "next/font/google";
import React from "react";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import QueryProviders from "@/utils/providers";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "T5",
  description: "Discuss, Podcast and Consult",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans overflow-hidden`}>
        <QueryProviders>{children}</QueryProviders>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          icon={false}
        />
      </body>
    </html>
  );
}
