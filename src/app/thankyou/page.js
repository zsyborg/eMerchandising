'use client'
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";

export default function Home() {


  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-lg">
        <div className="flex justify-center mb-6">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 Thank You!
        </h1>

        <p className="text-gray-600 mb-6">
          Your submission has been received. We’ll get back to you soon.
        </p>

        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
