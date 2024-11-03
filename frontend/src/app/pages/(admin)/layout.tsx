"use client";

import { Inter } from "next/font/google";
import Sidebar from "@/app/components/SideBar";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Scrollable Main Content Area */}
          <div className="flex-1 md:ml-0 p-0 overflow-y-auto mt-0 md:mt-0">
            <div className="md:mt-0 mt-16 md:px-0 px-4"> {/* Add top margin for mobile */}
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
