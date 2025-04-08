"use client";

import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";
import { app } from "../firebase.js";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const auth = getAuth(app);
  const { user, login, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const userData = {
        uid: resultFromGoogle.user.uid,
        displayName: resultFromGoogle.user.displayName,
        email: resultFromGoogle.user.email,
        photoURL: resultFromGoogle.user.photoURL,
      };

      const response = await fetch("https://newsserver-a71z.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const backendUser = await response.json();
      if (response.ok) {
        login(backendUser);
        closeMenu();
      } else {
        throw new Error(backendUser.error || "Lỗi từ backend");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Firebase sign out thành công");
        logout();
        closeMenu();
      })
      .catch((error) => {
        console.error("Lỗi đăng xuất:", error);
      });
  };

  const categories = [
    { name: "Technology", path: "/Category/Technology" },
    { name: "Sport", path: "/Category/Sport" },
    { name: "Entertainment", path: "/Category/Entertainment" },
    { name: "Business", path: "/Category/Business" },
    { name: "Book", path: "/Category/Book" },
    { name: "Food", path: "/Category/Food" },
    { name: "Health", path: "/Category/Health" },
    { name: "Science", path: "/Category/Science" },
  ];

  // Function to get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    const nameParts = user.name.split(" ");
    if (nameParts.length > 1) {
      return (
        nameParts[0][0] + nameParts[nameParts.length - 1][0]
      ).toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  };

  return (
    <header className="border-b shadow-md fixed h-[58px] z-30 bg-white w-full">
      <div className="flex items-center justify-between px-4 md:px-6 lg:w-5/6 mx-auto h-full">
        {/* Logo */}
        <NavLink
          to="."
          className="flex items-center gap-2 text-xl font-semibold cursor-pointer"
          onClick={closeMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
            />
          </svg>
          <span className="hidden sm:block">News Portal</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex gap-6 text-gray-700 font-medium">
            {categories.map((category) => (
              <li
                key={category.name}
                className="hover:text-blue-400 cursor-pointer"
              >
                <NavLink
                  to={category.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-medium border-b-2 border-blue-500 pb-1"
                      : "hover:border-b-2 hover:border-blue-400 pb-1"
                  }
                >
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center">
          {user ? (
            <div className="flex items-center gap-4">
              {user.avatar ? (
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-amber-800 text-white flex items-center justify-center font-semibold text-lg">
                  {getUserInitials()}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">{user.name}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSignIn}
              className="px-4 py-1.5 md:px-6 md:py-2 hover:bg-amber-100 text-black rounded-lg hover:cursor-pointer border border-gray-200 transition-colors flex items-center"
            >
              Sign in with Google
              <i className="fa-brands fa-google ml-2"></i>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex items-center justify-center"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMenu}
          ></div>
        )}

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden overflow-y-auto`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <NavLink
                to="."
                className="flex items-center gap-2 text-xl font-semibold"
                onClick={closeMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                  />
                </svg>
                <span>News Portal</span>
              </NavLink>
              <button onClick={closeMenu} aria-label="Close menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile User Info */}
            {user && (
              <div className="flex items-center gap-3 p-4 border-b bg-gray-50">
                {user.avatar ? (
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-amber-800 text-white flex items-center justify-center font-semibold text-lg">
                    {getUserInitials()}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{user.name}</span>
                  <span className="text-sm text-gray-500">{user.email}</span>
                </div>
              </div>
            )}

            {/* Mobile Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="flex flex-col gap-4 text-gray-700">
                {categories.map((category) => (
                  <li
                    key={category.name}
                    className="cursor-pointer border-b border-gray-100 pb-2"
                  >
                    <NavLink
                      to={category.path}
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-500 font-medium flex items-center"
                          : "font-medium hover:text-blue-500"
                      }
                      onClick={closeMenu}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="mr-2 w-1 h-5 bg-blue-500 rounded-full inline-block"></span>
                          )}
                          {category.name}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Auth Footer */}
            <div className="p-4 border-t mt-auto">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="w-full py-2.5 bg-white border border-gray-200 text-gray-800 rounded-md hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                    />
                    <path
                      fill="#FF3D00"
                      d="m6.306 14.255 3.961-2.674C10.78 10.45 12.673 9 14.894 9c1.544 0 2.912.57 4.006 1.515L24 8.174l-7.433-5.086C14.142 2.252 11.225 1 8.385 1 4.175 1 1 4.175 1 8.385c0 3.128 2.254 5.804 5.306 5.87z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
