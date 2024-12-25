"use client";

import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, BellIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { ChartBarIcon, UserIcon, WalletIcon } from 'lucide-react';
import { fetchUserCounts, fetchAppointmentCount } from '@/app/utils/api';
import Image from 'next/image';

export default function AnalyticCard() {
    const [counts, setCounts] = useState({
        totalUsers: 0,
        totalPatients: 0,
        totalDoctors: 0,
    });
    const [appointmentCount, setAppointmentCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCounts = async () => {
            try {
                const data = await fetchUserCounts();
                setCounts(data);
            } catch (error) {
                console.error('Error fetching counts:', error);
            } finally {
                setLoading(false);
            }
        };

        const getAppointmentCount = async () => {
            try {
                const count = await fetchAppointmentCount();
                setAppointmentCount(count);
            } catch (error) {
                console.error('Error fetching appointment count:', error);
            } finally {
                setLoading(false);
            }
        };

        getCounts();
        getAppointmentCount();
    }, []);

    return (
        <div className="bg-transparent no-scrollbar">
            {/* Header */}
            <header className="bg-maincolor shadow">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <svg className="h-10 w-10 text-white opacity-80 mr-2 ml-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="font-bold text-white">PURITY.</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-40 md:w-64 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                            />
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
                        </div>
                        <button className="text-white hover:text-gray-900">
                            <BellIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                    { title: "Total User", value: counts.totalUsers.toLocaleString(), change: "+55%", icon: <WalletIcon className="h-6 w-6 text-teal-400" /> },
                    { title: "Total Patients", value: counts.totalPatients.toLocaleString(), change: "+5%", icon: <UserIcon className="h-6 w-6 text-teal-400" /> },
                    { title: "Total Doctors", value: counts.totalDoctors.toLocaleString(), change: "-14%", icon: <UserGroupIcon className="h-6 w-6 text-teal-400" /> },
                    { title: "Total Appointments", value: loading ? 'Loading...' : appointmentCount.toLocaleString(), change: "+8%", icon: <ChartBarIcon className="h-6 w-6 text-teal-400" /> },
                    ].map((stat, index) => (
                    <div
                    key={index}
                    className="bg-white cursor-pointer overflow-hidden shadow rounded-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
                    >
                    <div className="p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                        <div className="text-2xl">
                            {stat.icon}
                        </div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                            <dd>
                            <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                            </dd>
                        </dl>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                    <div className="text-xs">
                        <span className={`font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                        </span>{' '}
                        <span className="text-gray-500">since yesterday</span>
                    </div>
                    </div>
                    </div>
                    ))}
                    </div>


                {/* Chakra and Rockets Cards */}
                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 ">
                    {/* Chakra Card */}
                    <div className="bg-teal-400 rounded-xl p-6 text-white transform transition duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
                        <h2 className="text-lg font-semibold mb-2">Purity UI Dashboard</h2>
                        <p className="text-teal-100 text-xs mb-6">
                            From colors, cards, typography to complex elements, you will find the full documentation.
                        </p>
                        <div className="flex justify-center mb-6">
                            <div className="bg-white rounded-full p-4">
                                <svg className="w-12 h-12 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium hover:underline">
                            Read more →
                        </a>
                    </div>

                    {/* Rockets Card */}
                    <div className="relative bg-gray-900 overflow-hidden shadow rounded-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer">
                        <div className="absolute inset-0">
                        <Image
                          src="/dashboardimg.png"
                          alt="Overlay Image"
                          className="w-full h-full object-cover"
                          layout="fill" // Use "fill" for full-size images
                          objectFit="cover" // Ensures the image covers the container
                        />
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                        </div>
                        <div className="relative p-5">
                            <h3 className="text-base font-medium text-white mb-2">Work with the PURITY.</h3>
                            <p className="text-gray-300 text-xs mb-4">
                                Wealth creation is an evolutionarily recent positive-sum game. Status is an old zero-sum game. Those attacking wealth creation are often just seeking status.
                            </p>
                            <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-medium">
                                Read More
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
