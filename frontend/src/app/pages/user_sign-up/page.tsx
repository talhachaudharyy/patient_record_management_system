"use client";
import { useState } from 'react';
import { registerUser } from '../../utils/api';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/app/components/Layout';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [type, setType] = useState<string>('doctor');
  const [specialization, setSpecialization] = useState<string>(''); // New state for specialization
  const [loading, setLoading] = useState<boolean>(false); // State to track loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const userData = {
        name,
        email,
        password,
        type,
        specialization: type === 'doctor' ? specialization : undefined, // Include specialization only if user type is doctor
      };

      const response = await registerUser(userData); // Hit the API

      // Simulate 3-second loading time
      setTimeout(() => {
        setLoading(false); // Stop loading after 3 seconds
        toast.success('Successfully registered! Please Check Your Email.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 3000);

    } catch (error: unknown) {
      setLoading(false); // Stop loading in case of error
      if (error instanceof Error) {
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Registration failed: An unknown error occurred.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-svg">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-white text-center mb-2">Welcome to PURITY!</h1>
          <p className="text-white text-center text-sm mb-8">
            Book appointments with ease and manage your schedule seamlessly.
          </p>

          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Join Us Today.</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 text-sm placeholder:text-sm py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 text-sm placeholder:text-sm py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
                <input
                  required
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 text-sm placeholder:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type:</label>
                <select
                  required
                  id="type"
                  name="type"
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option className='text-sm' value="doctor">Doctor</option>
                  <option className='text-sm' value="patient">Patient</option>
                </select>
              </div>
              {type === 'doctor' && ( // Conditionally render specialization field
                <div className="mb-6">
                  <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">Specialization:</label>
                  <input
                    required
                    type="text"
                    id="specialization"
                    name="specialization"
                    className="w-full px-3 py-2 text-sm placeholder:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Your specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value.toLowerCase())} 
                  />

                </div>
              )}
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                disabled={loading} // Disable the button while loading
              >
                {loading ? (
                  <img src="/loading.svg" alt="Loading" className="w-6 h-6 mx-auto animate-spin" /> // Show loading spinner
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account? <a href="/pages/user_sign-in" className="text-teal-500 hover:text-teal-600">Sign in</a>
            </p>
          </div>
        </div>

        {/* Toast Container for displaying notifications */}
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default RegisterPage;