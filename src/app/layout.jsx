import { Inter } from "next/font/google";
import "./globals.css";
import { LiffProvider } from "@/components/LiffProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EasyGo App",
  description: "Bus ticket booking application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LiffProvider>
          <main className="w-full bg-gray-50 min-h-screen">
            {children}
          </main>
        </LiffProvider>
      </body>
    </html>
  );
}
