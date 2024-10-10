import Image from "next/image";
import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

const page = () => {
  return (
    <div className="flex flex-col items-center bg-white min-h-screen">
      {/* Top Filter Bar */}
      <div className="w-full bg-white border-b border-gray-200 flex justify-center">
        <div className="w-full max-w-6xl flex items-center justify-between px-12 py-4">
          {/* Filter Container */}
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 space-x-4 w-full max-w-xl">
            {/* From Location */}
            <div className="flex items-center truncate">
              <span className="font-semibold text-gray-900">CDG</span>
              <span className="text-gray-500 ml-2 truncate">
                Paris Charles De Gaulle
              </span>
            </div>
            {/* Divider */}
            <div className="h-6 w-px bg-gray-300"></div>
            {/* To Location */}
            <div className="flex items-center truncate">
              <span className="font-semibold text-gray-900">DXB</span>
              <span className="text-gray-500 ml-2 truncate">
                Dubai International Airport
              </span>
            </div>
            {/* Divider */}
            <div className="h-6 w-px bg-gray-300"></div>
            {/* Dates */}
            <div className="text-gray-900 font-semibold whitespace-nowrap">
              Jun 25 - Jul 2
            </div>
            {/* Divider for Search Icon */}
            <div className="h-6 w-px bg-gray-300 ml-2"></div>
            {/* Search Icon */}
            <div className="bg-gray-100 rounded-full p-2">
              <FiSearch className="text-gray-500 w-4 h-4" />
            </div>
          </div>

          {/* Close Button with Spacing */}
          <button className="mr-2 p-2 rounded-full border border-gray-300">
            <FiX className="text-gray-500 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Result Section */}
      <div className="w-full max-w-6xl p-6 space-y-4">
        {/* Results Header */}
        <div className="text-gray-600">Showing 356 of 767 results</div>

        {/* Flight Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
          {/* Flight Details */}
          <div className="flex items-center space-x-6">
            {/* Airline Logo */}
            <Image
              src="/airline-logo.png"
              alt="Airline Logo"
              width={50}
              height={50}
              className="w-12 h-12"
            />
            <div>
              <div className="text-gray-700 font-semibold">
                Emirates • AT 4334
              </div>
              <div className="text-lg text-gray-900 font-semibold">
                9:45 AM - 11:45 AM
              </div>
              <div className="text-sm text-gray-500">Non-stop</div>
            </div>
          </div>
          {/* Duration and Stops */}
          <div className="text-gray-600">
            <div>2h 10min</div>
            <div>Non-stop</div>
          </div>
          {/* Price and Select Button */}
          <div className="text-right">
            <div className="text-gray-500 text-sm">from</div>
            <div className="text-2xl font-bold text-gray-900">AED 2,456.90</div>
            <button className="bg-green-800 text-white px-6 py-2 mt-2 rounded-md">
              Select
            </button>
          </div>
        </div>

        {/* Additional Flight Cards can be added here */}
      </div>
    </div>
  );
};

export default page;
