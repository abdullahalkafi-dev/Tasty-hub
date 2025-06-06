import type { Metadata } from "next";

import "./globals.css";
// import 'quill/dist/quill.snow.css'; // Import the Quill stylesheet

import AppProvider from "@/provider/app-provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className="bg-white  dark:bg-black">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
