import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Midtrans-Education",
  description: "For education purpose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
