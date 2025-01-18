"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "./components/Header";
import OnboardingSection from "./components/OnBoardingSection";
import AboutUsSection from "./components/AboutUsSection";
import ModesSection from "./components/ModesSection";
import VisionSection from "./components/VisionSection";
import WhoWeServeSection from "./components/WhoWeServeSection";


export default function Home() {
  const [showLogo, setShowLogo] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
    const timer = setTimeout(() => setShowLogo(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main className="flex-grow">
        {showLogo ? (
          <motion.div 
            className="min-h-screen flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image
              src="/images/she_logo.png"
              alt="Logo"
              width={200}
              height={200}
              priority
            />
          </motion.div>
        ) : (
          <>
            <OnboardingSection isLoggedIn={isLoggedIn} />
            <AboutUsSection />
            <WhoWeServeSection />
            <VisionSection />
            <ModesSection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );

  
}



function Footer() {
  return (
    <footer className="bg-pinkCustom text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">SHE LAW</h3>
            <p className="text-sm">Empowering women through legal knowledge and support.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#onboarding" className="hover:text-pink-200 transition-colors">Home</a></li>
              <li><a href="#aboutus" className="hover:text-pink-200 transition-colors">About Us</a></li>
              <li><a href="#modes" className="hover:text-pink-200 transition-colors">Modes</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm mb-2">Email: nezukosan.mcs@gmail.com</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2025 SHE LAW. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
