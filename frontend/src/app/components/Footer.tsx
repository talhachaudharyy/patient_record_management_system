import React from 'react'

function Footer() {
  return (
    <footer className="bg-white py-4 my-4">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm text-gray-600">
          <div>© 2024, Made with Talha Chaudhary</div>
          <div className="flex space-x-4 text-xs">
            <a href="#" className="hover:text-gray-900">Creative Tim</a>
            <a href="#" className="hover:text-gray-900">Simmmple</a>
            <a href="#" className="hover:text-gray-900">Blog</a>
            <a href="#" className="hover:text-gray-900">License</a>
          </div>
        </div>
      </footer>
  )
}

export default Footer