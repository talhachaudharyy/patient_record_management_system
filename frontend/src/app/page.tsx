"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FileText, Lock, Clock, Users, Moon, Sun, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleAdminLogin = () => {
    setLoading(true); // Show loading spinner
    setTimeout(() => {
      router.push('/pages/adminLogin'); // Navigate after 2 seconds
    }, 2000); // Simulate a 2-second delay for loading
  };

  const handleUserLoginRegister = () => {
    router.push('/pages/user_sign-up');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const features = [
    { icon: FileText, title: "Digital Records", description: "Store and access patient records digitally" },
    { icon: Lock, title: "Secure Data", description: "State-of-the-art encryption for medical information" },
    { icon: Clock, title: "Appointment Management", description: "Easily schedule and manage appointments" },
    { icon: Users, title: "Multi-User Access", description: "Different access levels for various roles" },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <Image width={30} height={30} src="/loading.svg" alt="Loading" className="animate-spin" />
        </div>
      )}

      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div
            className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            MedRecord
          </motion.div>
          <div className="flex items-center space-x-4">
            <a href="#features" className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Features</a>
            <a href="#pricing" className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Pricing</a>
            <motion.button
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-600'}`}
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Streamline Your Medical Records
          </h1>
          <p className={`text-xl mb-12 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Efficient, secure, and user-friendly medical record management system for healthcare providers.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.button
              onClick={handleUserLoginRegister}
              className={`px-8 py-3 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
            <motion.button
              onClick={handleAdminLogin}
              className={`px-8 py-3 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'text-gray-900 bg-white hover:bg-gray-100'} font-semibold rounded-lg shadow-md transition duration-300 ease-in-out border border-gray-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Admin Login
            </motion.button>
          </div>
        </motion.section>

        <section id="features" className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Key Features</h2>
          <div className="flex justify-center space-x-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <feature.icon className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'} mr-4`} />
                  <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          id="pricing"
          className={`py-12 px-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h2 className={`text-3xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Simple, Transparent Pricing</h2>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8">
            {[
              { title: "Basic", price: "$29", features: ["Up to 500 records", "Basic reporting", "Email support"] },
              { title: "Pro", price: "$79", features: ["Unlimited records", "Advanced analytics", "24/7 phone support", "Custom integrations"] },
              { title: "Enterprise", price: "$149", features: ["Unlimited records", "Advanced analytics", "24/7 phone support", "Custom integrations", "Dedicated account manager"] },
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`w-full md:w-80 p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.title}</h3>
                <p className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.price}<span className="text-sm font-normal">/month</span></p>
                <ul className="mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`flex items-center mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <ChevronRight className="w-5 h-5 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  className={`w-full py-2 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choose Plan
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <footer className={`py-8 mt-16 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2023 MedRecord. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-500">Privacy Policy</a>
            <a href="#" className="hover:text-blue-500">Terms of Service</a>
            <a href="#" className="hover:text-blue-500">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
