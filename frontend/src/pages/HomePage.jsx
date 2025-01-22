import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import HomePageBody from '../components/HomePageBody';

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <header className="flex-shrink-0">
        <Navbar />
      </header>
      <main className="flex-grow">
        <HomePageBody />
      </main>
      <footer className="flex-shrink-0">
        <Footer />
      </footer>
    </div>
  );
}

export default HomePage;
