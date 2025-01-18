import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

export default function Header({ isLoggedIn, setIsLoggedIn }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <header className="fixed w-full bg-pinkCustom text-white p-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">SHE LAW</Link>
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#onboarding" className="hover:text-pink-200 transition-colors">Home</a>
          <a href="#aboutus" className="hover:text-pink-200 transition-colors">About Us</a>
          <a href="#modes" className="hover:text-pink-200 transition-colors">Modes</a>
          {!isLoggedIn ? (
            <>
              <Link href="/signin" className="hover:text-pink-200 transition-colors">Sign In</Link>
              <Link href="/signup" className="bg-white text-pinkCustom px-3 py-1 rounded hover:bg-pink-200 transition-colors">Sign Up</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-white text-pinkCustom px-3 py-1 rounded hover:bg-pink-200 transition-colors"
            >
              Logout
            </button>
          )}
        </nav>
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden mt-4 flex flex-col space-y-4">
          <a href="#onboarding" className="hover:text-pink-200 transition-colors">Home</a>
          <a href="#aboutus" className="hover:text-pink-200 transition-colors">About Us</a>
          <a href="#modes" className="hover:text-pink-200 transition-colors">Modes</a>
          {!isLoggedIn ? (
            <>
              <Link href="/signin" className="hover:text-pink-200 transition-colors">Sign In</Link>
              <Link href="/signup" className="bg-white text-pinkCustom px-3 py-1 rounded hover:bg-pink-200 transition-colors inline-block">Sign Up</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-white text-pinkCustom px-3 py-1 rounded hover:bg-pink-200 transition-colors"
            >
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
}

