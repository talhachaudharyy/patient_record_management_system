"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { loginAdmin } from '../../utils/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Simulate 5 seconds delay
      setTimeout(async () => {
        const data = await loginAdmin(email, password);

        // Check if the response contains the expected structure
        if (!data || !data.token || !data.admin) {
          setMessage('Invalid response from server');
          setLoading(false); // Stop loading if login fails
          return;
        }

       // Save both adminData and adminToken in one cookie
        const adminData = {
          admin: data.admin,
          token: data.token,
        };

        // Set the cookie with the combined data
        Cookies.set('adminData', JSON.stringify(adminData), { expires: rememberMe ? 7 : 1 }); // Expires in 7 days if rememberMe is true, otherwise 1 day


        // Redirect to admin home page
        router.push('/pages/adminHome');
      }, 3000); // 3 seconds delay before the actual login
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Login failed: ${error.message}`);
      } else {
        setMessage('Login failed: An unknown error occurred.');
      }
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-600">Please enter your credentials to sign in</p>
          </div>

          {loading ? (
            // Loading spinner
            <div className="flex justify-center items-center">
              <img src="/loading.svg" alt="Loading" className="w-10 h-10" />
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    required
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-400 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Sign in
              </button>
            </form>
          )}

          {message && (
            <div className="text-center text-sm text-red-600">
              {message}
            </div>
          )}
          
        </div>
      </div>

      {/* Right side - Teal background with logo */}
      <div className="hidden md:block w-1/2 bg-teal-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-400 opacity-75"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-32 h-32 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 opacity-50"></div>
      </div>
    </div>
  );
}
