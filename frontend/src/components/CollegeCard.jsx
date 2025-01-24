import React from "react";

function BackgroundSection({ image, label, description }) {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-gray-800 text-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full lg:w-1/3 h-40 lg:h-60">
        <img
          src={image}
          alt={`${label} image`}
          className="w-40 h-40 p-1 mt-10 ml-8 object-contain"
        />
      </div>

      <div className="w-full lg:w-2/3 flex flex-col justify-center p-4 space-y-3 text-center lg:text-left">
        <h1 className="text-xl font-semibold">{label}</h1>
        <p className="text-gray-300 text-sm">{description}</p>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-all duration-300">
          Explore More
        </button>
      </div>
    </div>
  );
}

export default BackgroundSection;
