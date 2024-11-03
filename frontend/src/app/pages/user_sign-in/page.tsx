"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../utils/api';
import jwt from 'jsonwebtoken';
import Layout from '@/app/components/Layout';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // State to track loading

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const data = await loginUser(email, password);

      // Check if the response contains the expected structure
      if (!data || !data.token || !data.user) {
        setMessage('Invalid response from server');
        setLoading(false); // Stop loading
        return;
      }

      // Decode the token to get the user type
      const decodedToken = jwt.decode(data.token) as { user: { type: string } };

      if (!decodedToken || !decodedToken.user || !decodedToken.user.type) {
        setMessage('Invalid token');
        setLoading(false); // Stop loading
        return;
      }

      // Simulate 3-second loading time before redirection
      setTimeout(() => {
        setLoading(false); // Stop loading after 3 seconds
        if (decodedToken.user.type === 'patient') {
          router.push('/pages/patientHome');
        } else if (decodedToken.user.type === 'doctor') {
          router.push('/pages/doctorHome');
        } else {
          setMessage('Unknown user type');
        }
      }, 3000);

    } catch (error: unknown) {
      setLoading(false); // Stop loading in case of error
      if (error instanceof Error) {
        setMessage(`Login failed: ${error.message}`);
      } else {
        setMessage('Login failed: An unknown error occurred.');
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
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Enter Your Credentials</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                <input type="email" id="email" name="email" className="w-full px-3 py-2 text-sm border placeholder:text-sm  border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)}  required/>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
                <input type="password" id="password" name="password" className="w-full px-3 text-sm py-2 placeholder:text-sm  border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              </div>
              <div className="flex items-center mb-6">
                <input type="checkbox" id="remember" name="remember" className="h-4 w-4 placeholder:text-sm border text-teal-600 focus:ring-teal-500 border-gray-300 rounded :" required/>
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                disabled={loading} // Disable the button while loading
              >
                {loading ? (
                  <img src="/loading.svg" alt="Loading" className="w-6 h-6 mx-auto animate-spin" /> // Show loading spinner
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            
            {message && (
              <div className="mt-4 text-center text-sm text-gray-600">
                {message}
              </div>
            )}
            
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account? <a href="/pages/user_sign-up" className="text-teal-500 hover:text-teal-600">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;