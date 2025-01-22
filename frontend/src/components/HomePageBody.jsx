import React from 'react';

function HomePageBody() {
  return (
    <div className="flex-grow flex flex-col justify-center items-center bg-gray-800 text-white">
      <h1 className="font-bold text-[40px] sm:text-[70px] md:text-[100px] text-center">
        WELCOME TO OUR
      </h1>
      <span className="font-bold text-[40px] sm:text-[70px] md:text-[100px] text-center text-white">
        WEBSITE
      </span>
      <span className="text-red-500 font-bold text-[50px] sm:text-[80px] md:text-[120px] text-center">
        RED PRIEST
      </span>
    </div>
  );
}

export default HomePageBody;
