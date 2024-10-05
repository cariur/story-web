// components/FloatingButton.js
import Link from "next/link";
import React from "react";
import { FaCoffee } from "react-icons/fa";

const FloatingButton = () => {
  return (
    <div
      className="p-4 bg-yellow-500 text-white rounded-full shadow-lg transition duration-300 hover:bg-yellow-600 flex items-center space-x-2"
      style={{ zIndex: 1000 }} // Ensure it's above other elements
    >
      <Link
        href="/tip"
        aria-label="Go to tip page"
        className="flex items-center"
      >
        <FaCoffee className="text-2xl pr-4 p-8" />
        <span className="md:inline ml-2">Buy a Coffee</span>{" "}
        {/* Updated text */}
      </Link>
    </div>
  );
};

export default FloatingButton;
