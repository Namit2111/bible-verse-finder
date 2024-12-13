"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for routing
import Link from "next/link";
import Image from "next/image";
import { NavMenu } from "@/lib/interface";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
const navMenu = [
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Verse Match",
    link: "/versematch",
  },
];

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState<any>(null); // State to store logged-in user
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown
  const router = useRouter(); // Initialize useRouter

  // Check user login status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user info if logged in
    });

    // Cleanup the subscription when component unmounts
    return () => unsubscribe();
  }, []);

  const handleProfile = () => {
    router.push("/profile"); // Route to the profile page
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user info after logout
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };
  return (
    <header className="py-4 sm:py-2">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="shrink-0 self-center">
            <Link href="/" title="logo">
              <Image
                className="w-auto h-auto pb-1"
                src="/images/image.png"
                alt="logo"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className="flex md:hidden">
            <button type="button" onClick={() => setExpanded(!expanded)}>
              <span aria-hidden="true">
                <Image
                  className="w-7 h-7 invert"
                  src="/images/menu.svg"
                  alt="Menu Icon"
                  width={100}
                  height={100}
                />
              </span>
            </button>
          </div>
          <nav
            className={`${
              expanded
                ? "max-md:flex max-md:flex-col max-md:basis-full max-md:pb-4 max-md:space-y-6"
                : "hidden"
            } md:ml-10 md:mr-auto md:space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-center md:justify-start`}
          >
            <div className="flex max-md:flex-col max-md:bg-gray-900 max-md:p-3 max-md:-mt-10 max-md:rounded-md max-md:gap-2 gap-8">
              {navMenu.map((item: NavMenu, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="text-lg font-bold text-gray-400 transition-all duration-200 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
          <div className="ml-auto">
            {user ? (
              <div className="relative flex items-center">
                {/* Display the user's image */}
                <img
                  src={user.photoURL || "/images/avatar.png"}
                  alt={user.displayName || "User"}
                  className="h-8 w-8 rounded-full object-cover"
                />

                {/* Dropdown arrow button next to the user's photo */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="ml-2 text-gray-400 transition-all duration-200 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.23a1 1 0 011.41 0L10 10.586l3.36-3.356a1 1 0 111.42 1.412l-4 4a1 1 0 01-1.42 0l-4-4a1 1 0 010-1.42z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Dropdown menu with logout button */}
                {dropdownOpen && (
				  <div className="absolute right-0 mt-20 bg-gray-800 text-white rounded-md shadow-lg">
                    <button
                      onClick={handleProfile}
                      className="block px-5 py-2 text-sm hover:bg-gray-600"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block px-5 py-2 text-sm hover:bg-gray-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="">
                <Link
                  href="/login"
                  className="text-lg font-bold text-gray-400 transition-all duration-200 hover:text-white mr-4"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="text-lg font-bold text-gray-900 transition-all duration-200 hover:text-white border-2 border-blue-500 py-2 px-3 rounded-md bg-blue-500 hover:bg-blue-600"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
