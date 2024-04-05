// Import necessary dependencies
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import bg from "../public/images/app_background_image.jpg";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LanguageProvider from "@/contexts/LanguageProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aswas Next App",
  description: "Developed by @Avinaba",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        suppressHydrationWarning={true}
        style={{
          backgroundImage: `url(${bg.src})`,
          width: "100%",
          height: "100%",
        }}
      >
        <LanguageProvider>
          <SkeletonTheme baseColor="#B0B4BA" highlightColor="#ffffff">
            {children}
          </SkeletonTheme>
        </LanguageProvider>
      </body>
    </html>
  );
}
