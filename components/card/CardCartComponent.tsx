import React from 'react'

export default function CardCartComponent() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4">
            <div className='grid grid-flow-col items-center'>
                {/* Left Section: Image */}
                <div className="flex-shrink-0 mr-4 mb-4 md:mb-0">
                    <img src="https://i.pinimg.com/564x/3a/f7/ea/3af7ea9803e6cbea1f5880e722e28a82.jpg" alt="Product Image" className="h-60 w-60 rounded-lg" />
                </div>

                {/* Right Section: Name, Detail, Price */}
                <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">Product Name</h2>
                    <p className="text-sm text-gray-600">Product Detail</p>
                    <p className="text-sm font-semibold text-gray-700">$19.99</p>
                </div>
            </div>

            <div className='grid grid-flow-col gap-4 md:gap-40'>
                {/* Add/Remove Buttons and Quantity */}
                <div className="flex items-center mb-4 md:mb-0">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded-l focus:outline-none">-</button>
                    <span className="text-lg font-semibold mx-2">2</span> {/* Display Quantity Here */}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded-r focus:outline-none">+</button>
                </div>

                {/* Total Price */}
                <div className="mb-4 md:mb-0">
                    <p className="text-lg font-semibold text-gray-800">$39.98</p>
                </div>

                {/* Delete Icon */}
                <div>
                    <button className="text-red-500 hover:text-red-700 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
    </div>
  )
}
