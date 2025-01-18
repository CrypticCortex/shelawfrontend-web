"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Config from "@/app/config"; // <-- Update to the correct path for your config.ts

export default function SignIn() {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Feedback state
  const [errorMsg, setErrorMsg] = useState("");
  const [, setSuccessMsg] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Optionally fetch new config
      await Config.getInstance().fetchNgrokUrls();
      const baseUrl = Config.getInstance().apiBaseUrl;

      console.log(`API BASE ${baseUrl}`);

      // Make login request
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data?.message || "Failed to login. Please try again.");
      } else {
        if (data?.access_token) {
          // Store access_token in localStorage
          localStorage.setItem("accessToken", data.access_token);
          setSuccessMsg("Login successful!");

          // Redirect to home after a short delay
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else {
          setErrorMsg("No access token returned from server!");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };


  return (
    <div className="min-h-screen flex">
      {/* Form Section */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <Image
          src="/images/back.png" 
          alt="Back"
          width={200}
          height={150}
          onClick={() => router.back()}
          className="absolute top-1 left-0 cursor-pointer"
        />
        <div className="bg-white bg-opacity-90 p-10 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-magenta to-fuchsia text-transparent bg-clip-text animate-fade-in">
            Welcome!!
          </h2>
          <p className="text-center mb-8 bg-gradient-to-r from-magenta to-fuchsia text-transparent bg-clip-text animate-fade-in">
            Login. Ask. Get Answer
          </p>

          {/* Show any error message */}
          {errorMsg && (
            <p className="text-red-600 text-center mb-4">{errorMsg}</p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fas fa-envelope text-grape"></i>
                </span>
                <input
                  type="email"
                  className="w-full py-3 pl-10 pr-3 bg-white text-gray-900 border border-grape rounded-full focus:outline-none focus:ring-4 focus:ring-pinkCustom shadow transition duration-300"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fas fa-lock text-pinkCustom"></i>
                </span>
                <input
                  type="password"
                  className="w-full py-3 pl-10 pr-3 bg-white text-gray-900 border border-grape rounded-full focus:outline-none focus:ring-4 focus:ring-grape shadow transition duration-300"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="flex justify-between mb-4 text-xs text-grape">
              <a href="#" className="hover:underline">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-grape text-white py-2 px-6 rounded-full shadow-lg hover:bg-lightpink transition duration-300 transform hover:scale-105"
            >
              <i className="fas fa-user-plus mr-2"></i> Login
            </button>
          </form>
          <p className="text-center mt-8 text-sm text-grape">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      {/* Animation Section */}
      <div className="w-1/2 relative flex items-center justify-center bg-lightpink">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full top-16 left-1/4 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-gradient-to-r from-violet-500 to-green-500 rounded-full bottom-16 right-1/4 animate-pulse"></div>
        <Image
          src="/images/illustration2.png"
          alt="Illustration"
          width={712}
          height={712}
          className="z-10"
        />
      </div>
    </div>
  );
}
