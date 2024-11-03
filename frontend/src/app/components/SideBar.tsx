"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  HomeIcon,
  TableCellsIcon,
  UserCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { MenuIcon, XIcon, Loader2 } from "lucide-react";
import LogoutButton from "./Logout";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const handleLinkClick = (path: string) => {
    if (path !== pathname) {
      setIsLoading(true);
      setActiveLink(path);
      router.push(path);
      setIsMobileMenuOpen(false);
      
      // Simulate page load delay (remove this in production and use real page load event)
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, path: "/pages/adminHome" },
    { name: "Patients", icon: <TableCellsIcon className="w-5 h-5" />, path: "/pages/patientRecord" },
    { name: "Appointments", icon: <TableCellsIcon className="w-5 h-5" />, path: "/pages/appointmentRecords" },
    { name: "Approvals", icon: <TableCellsIcon className="w-5 h-5" />, path: "/pages/patientApproval" },
    { name: "Doctors", icon: <TableCellsIcon className="w-5 h-5" />, path: "/pages/doctorRecord" },
    { name: "Profile", icon: <UserCircleIcon className="w-5 h-5" />, path: "/pages/AdminProfile" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-100"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <XIcon className="w-6 h-6" />
        ) : (
          <MenuIcon className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:inset-auto md:h-screen`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h1 className="text-lg font-semibold text-gray-800">Purity Dashboard</h1>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-3">
              {menuItems.map(({ name, icon, path }) => (
                <li key={name}>
                  <button
                    className={`flex items-center w-full text-sm p-2 rounded-lg transition-colors duration-200
                      ${activeLink === path ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"}`}
                    onClick={() => handleLinkClick(path)}
                  >
                    {icon}
                    <span className="ml-3">{name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t">
            <LogoutButton
              className="bg-teal-500 hover:bg-teal-600 text-white flex items-center justify-center p-2 rounded-lg w-full transition-colors duration-200"
              cookieName="adminData"
            />
          </div>
          <div className="p-4">
            <div className="bg-teal-50 text-teal-700 p-3 rounded-lg flex items-start space-x-3 text-sm">
              <QuestionMarkCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Need help?</h3>
                <p className="text-xs mt-1">Check our docs</p>
                <button className="mt-2 bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs font-medium hover:bg-teal-200 transition-colors duration-200">
                  Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-full p-4 shadow-lg"
            >
              <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}