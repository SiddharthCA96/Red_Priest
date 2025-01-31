import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Red Priest. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
          <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>
          <a href="#" className="text-blue-400 hover:text-blue-300">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
