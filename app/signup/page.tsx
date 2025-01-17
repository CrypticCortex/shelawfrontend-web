"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Config from "@/app/config"; // Adjust path as needed

export default function SignUp() {
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Feedback state
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Optionally refresh config from GitHub
      await Config.getInstance().fetchNgrokUrls();
      const baseUrl = Config.getInstance().apiBaseUrl;

      // Make signup request
      const response = await fetch(`${baseUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Adjust property names according to your backend
          full_name: name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data?.message || "Failed to sign up.");
      } else {
        // If your backend sends back a token, you could store it here
        // localStorage.setItem("accessToken", data.access_token);

        setSuccessMsg("Signup successful! `Check your mail for validation link.");
        // Optionally redirect to sign in
        // router.push("/signin");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Section */}
      <div className="w-1/2 bg-white flex items-center justify-center relative">
        <Image
          src="/images/back.png"
          alt="Back"
          width={200}
          height={150}
          onClick={() => router.push("/")}
          className="absolute top-1 left-0 cursor-pointer"
        />
        <div className="bg-white bg-opacity-90 p-10 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold mb-6 text-center text-transparent bg-gradient-to-r from-magenta to-fuchsia bg-clip-text animate-fade-in">
            Create an Account
          </h2>
          <p className="text-center mb-8 text-transparent bg-gradient-to-r from-magenta to-fuchsia bg-clip-text animate-fade-in">
            Sign up for a free account to get started
          </p>

          {errorMsg && <div className="text-red-600 mb-4 text-center">{errorMsg}</div>}
          {successMsg && <div className="text-green-600 mb-4 text-center">{successMsg}</div>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fas fa-user text-grape"></i>
                </span>
                <input
                  type="text"
                  className="w-full py-3 pl-10 pr-3 bg-white text-gray-900 border border-grape rounded-full focus:outline-none focus:ring-4 focus:ring-pinkCustom shadow transition duration-300"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="fas fa-envelope text-grape"></i>
                </span>
                <input
                  type="email"
                  className="w-full py-3 pl-10 pr-3 bg-white text-gray-900 border border-grape rounded-full focus:outline-none focus:ring-4 focus:ring-pinkCustom shadow transition duration-300"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-grape text-white py-2 px-6 rounded-full shadow-lg hover:bg-lightpink transition duration-300 transform hover:scale-105"
            >
              <i className="fas fa-user-plus mr-2"></i> Sign Up
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <span className="text-grape cursor-pointer" onClick={() => router.push("/signin")}>
              Sign In
            </span>
          </p>
        </div>
      </div>

      {/* Animation Section */}
      <div className="w-1/2 relative flex items-center justify-center bg-lightpink">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full top-16 left-1/4 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-gradient-to-r from-violet-500 to-green-500 rounded-full bottom-16 right-1/4 animate-pulse"></div>
        <Image
          src="/images/illustration3.png"
          alt="Illustration"
          width={712}
          height={712}
          className="z-10"
        />
      </div>
    </div>
  );
}
