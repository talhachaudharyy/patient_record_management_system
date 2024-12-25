
"use client"
import LogoutButton from '@/app/components/Logout'
import React from 'react'
import { useState } from 'react'
import {
  CalendarIcon,
  ClipboardIcon,

  BellIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('appointments')
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appointments':
        return <AppointmentsTab />
      case 'patients':
        return <PatientsTab />
      case 'prescriptions':
        return <PrescriptionsTab />
      case 'schedule':
        return <ScheduleTab />
      default:
        return <AppointmentsTab />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-maincolor shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
              <svg className='h-10 w-10 text-white opacity-80 mr-2 ml-0' viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              <span className="font-bold text-white">PURITY. </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="w-64 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:placeholder-transparent"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" />
              </div>
              <div className='mx-4'>
              <LogoutButton cookieName="userData" />
              </div>

              <button className="ml-4 p-1 rounded-full text-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <BellIcon className="h-4 w-4" />
              </button>
              <button className="ml-3 p-1 rounded-full text-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Cog6ToothIcon className="h-4 w-4" />
              </button>
              <Image width={20} height={20} className="ml-3 rounded-full" src="/placeholder.svg?height=32&width=32" alt="User avatar" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="px-4 sm:px-0">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back, Dr. Smith</h1>
            <p className="mt-2 text-sm text-gray-600">{currentDate}</p>
          </div>

          {/* Tabs */}
          <div className="mt-4">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">Select a tab</label>
              <select
                id="tabs"
                name="tabs"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="appointments">Appointments</option>
                <option value="patients">Patients</option>
                <option value="prescriptions">Prescriptions</option>
                <option value="schedule">Schedule</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {['appointments', 'patients', 'prescriptions', 'schedule'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`${
                        activeTab === tab
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  )
}

function AppointmentsTab() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Appointments</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {[
            { id: 1, name: 'Jane Cooper', time: '09:00 AM', symptoms: 'Headache, Fever' },
            { id: 2, name: 'John Doe', time: '10:30 AM', symptoms: 'Back pain' },
            { id: 3, name: 'Alice Johnson', time: '02:00 PM', symptoms: 'Annual check-up' },
          ].map((appointment) => (
            <li key={appointment.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{appointment.name}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {appointment.time}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <ClipboardIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      {appointment.symptoms}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function PatientsTab() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Patient Records</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {[
            { id: 1, name: 'Emma Wilson', age: 32, lastVisit: '2023-05-15' },
            { id: 2, name: 'Michael Brown', age: 45, lastVisit: '2023-06-02' },
            { id: 3, name: 'Sophia Lee', age: 28, lastVisit: '2023-06-10' },
          ].map((patient) => (
            <li key={patient.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{patient.name}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Age: {patient.age}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      Last visit: {patient.lastVisit}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <button className="text-indigo-600 hover:text-indigo-900">View Record</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function PrescriptionsTab() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Write Prescription</h2>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="patient" className="block text-sm font-medium text-gray-700">
                Patient Name
              </label>
              <select
                id="patient"
                name="patient"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option>Jane Cooper</option>
                <option>John Doe</option>
                <option>Alice Johnson</option>
              </select>
            </div>
            <div>
              <label htmlFor="medication" className="block text-sm font-medium text-gray-700">
                Medication
              </label>
              <input
                type="text"
                name="medication"
                id="medication"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">
                Dosage
              </label>
              <input
                type="text"
                name="dosage"
                id="dosage"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                Instructions
              </label>
              <textarea
                id="instructions"
                name="instructions"
                rows={3}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Write Prescription
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function ScheduleTab() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Manage Schedule</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {[
            { id: 1, day: 'Monday', hours: '9:00 AM - 5:00 PM' },
            { id: 2, day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
            { id: 3, day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
            { id: 4, day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
            { id: 5, day: 'Friday', hours: '9:00 AM - 3:00 PM' },
          ].map((schedule) => (
            <li key={schedule.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{schedule.day}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="text-sm text-gray-500">{schedule.hours}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <button className="text-sm text-indigo-600 hover:text-indigo-900">Edit</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Block Off Time
        </button>
      </div>
    </div>
  )
}
