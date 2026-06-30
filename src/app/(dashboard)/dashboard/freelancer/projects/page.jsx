"use client"
import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 text-center max-w-md w-full">
        <div className="text-6xl mb-4">🛠️</div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Under Maintenance
        </h1>

        <p className="text-gray-600 mb-6">
          We're currently improving our website to give you a better experience.
          Please check back later.
        </p>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-black px-6 py-3 rounded-xl transition duration-300"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default Page;
