import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import classNames from "classnames";
import AppLayout from "@/components/layout/AppLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MovieDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={classNames(
          "antialiased bg-secondary hide-nextjs-portal",
          geistSans.variable,
          geistMono.variable
        )}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
