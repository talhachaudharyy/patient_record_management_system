"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
    cookieName: string;
    className?: string; // Make className optional
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ cookieName, className }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        setLoading(true); // Set loading to true when logout starts

        // Function to delete a cookie
        const deleteCookie = (name: string) => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        };

        // Delete the cookie
         deleteCookie(cookieName);

        // Simulate a 3-second delay before redirecting
        setTimeout(() => {
            setLoading(false); // Set loading to false (not necessary if you're redirecting)
             router.push('/'); // Redirect to the home page after the delay
        }, 3000);
    };

    return (
        <div>
            {loading && (
                // Overlay for blurring the screen and showing the SVG
                <div className="absolute inset-0 w-[1350px] bg-gray-800 bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
                    {/* Loading SVG */}
                    <img src="/loading.svg" alt="Loading" className="w-12 h-12 animate-spin" />
                    <h1 className="text-white text-lg font-semibold tracking-wide uppercase">Logging Out...</h1>
                    </div>
            )}

            {/* Logout Button */}
            <button
                className={`${className} text-sm font-medium`}
                onClick={handleLogout}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
                Logout
            </button>
        </div>
    );
};

export default LogoutButton;