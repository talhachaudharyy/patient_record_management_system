"use client"
import LogoutButton from '@/app/components/Logout'
import { useEffect, useState } from 'react'
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  DocumentTextIcon,
  PlusCircleIcon,
  ChevronRightIcon,
  BellIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function PatientHome() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />
      case 'appointments':
        return <AppointmentsTab />
      case 'records':
        return <MedicalRecordsTab />
      case 'prescriptions':
        return <PrescriptionsTab />
      default:
        return <DashboardTab />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
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
                  placeholder="Search..."
                  className="w-64 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:placeholder-transparent"
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
              <img className="ml-3 h-8 w-8 rounded-full" src="/placeholder.svg?height=32&width=32" alt="User avatar" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="px-4 sm:px-0">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back, John</h1>
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
                <option value="dashboard">Dashboard</option>
                <option value="appointments">Appointments</option>
                <option value="records">Medical Records</option>
                <option value="prescriptions">Prescriptions</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {['dashboard', 'appointments', 'records', 'prescriptions'].map((tab) => (
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

function DashboardTab() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Next Appointment</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">June 15, 2023</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">View all appointments</a>
          </div>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Recent Prescriptions</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">2</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Manage prescriptions</a>
          </div>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Your Doctor</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">Dr. Sarah Johnson</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Contact doctor</a>
          </div>
        </div>
      </div>
    </div>
  )
}

function AppointmentsTab() {
  const [showForm, setShowForm] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const handleBookingSuccess = () => {
    setShowForm(false)
    setShowConfirmation(true)
  }

  const closeConfirmation = () => {
    setShowConfirmation(false)
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Your Appointments</h2>
        <button 
          onClick={toggleForm}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Book New Appointment
        </button>
      </div>

      {showForm && <AppointmentForm onClose={toggleForm} onBookingSuccess={handleBookingSuccess} />}
      {showConfirmation && <ConfirmationCard onClose={closeConfirmation} onBookingSuccess={function (): void {
        throw new Error('Function not implemented.')
      } } />}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {[
            { id: 1, doctor: 'Dr. Sarah Johnson', date: 'June 15, 2023', time: '10:00 AM', type: 'Check-up' },
            { id: 2, doctor: 'Dr. Michael Lee', date: 'June 22, 2023', time: '2:30 PM', type: 'Follow-up' },
            { id: 3, doctor: 'Dr. Emily Brown', date: 'July 5, 2023', time: '11:15 AM', type: 'Consultation' },
          ].map((appointment) => (
            <li key={appointment.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">{appointment.doctor}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {appointment.type}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {appointment.date}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {appointment.time}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <ChevronRightIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ConfirmationCard({ onClose }: AppointmentFormProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="confirmation-modal">
      <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <CheckIcon className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 mt-5">Appointment Booked Successfully!</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Your appointment has been confirmed. You will receive an email with the details shortly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface AppointmentFormProps {
  onClose: () => void;               // Type for onClose
  onBookingSuccess: () => void;      // Type for onBookingSuccess
}

function AppointmentForm({ onClose, onBookingSuccess }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: '',
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    onBookingSuccess()
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Book New Appointment</h3>
          <form onSubmit={handleSubmit} className="mt-2 text-left">
            <div className="mb-4">
              <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor</label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select a doctor</option>
                <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                <option value="Dr. Michael Lee">Dr. Michael Lee</option>
                <option value="Dr. Emily Brown">Dr. Emily Brown</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Visit</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function MedicalRecordsTab() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Your Medical Records</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {[
            { id: 1, type: 'Lab Results', date: 'May 10, 2023', doctor: 'Dr. Sarah Johnson' },
            { id: 2, type: 'X-Ray Report', date: 'April 22, 2023', doctor: 'Dr. Michael Lee' },
            { id: 3, type: 'Vaccination Record', date: 'March 15, 2023', doctor: 'Dr. Emily Brown' },
          ].map((record) => (
            <li key={record.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">{record.type}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        View
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {record.date}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {record.doctor}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
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
      <h2 className="text-lg font-medium text-gray-900 mb-4">Your Prescriptions</h2>
      <div className="bg-white shadow overflow-hidden  sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {[
            { id: 1, medication: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', doctor: 'Dr. Sarah Johnson', date: 'June 1, 2023' },
            { id: 2, medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', doctor: 'Dr. Michael Lee', date: 'May 15, 2023' },
            { id: 3, medication: 'Metformin', dosage: '1000mg', frequency: 'With meals', doctor: 'Dr. Emily Brown', date: 'April 30, 2023' },
          ].map((prescription) => (
            <li key={prescription.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">{prescription.medication}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <button className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Refill
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <DocumentTextIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {prescription.dosage}, {prescription.frequency}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <p>
                        Prescribed on <time dateTime={prescription.date}>{prescription.date}</time>
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                    {prescription.doctor}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}