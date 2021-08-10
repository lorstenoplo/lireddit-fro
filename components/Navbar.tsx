import React from "react";
import Link from "next/link";
import { useLogoutMutation, useMeQuery } from "../src/generated/graphql";

export const isServer = () => typeof window === "undefined";

const Navbar = () => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  return (
    <header className="text-gray-600 body-font sticky top-0 bg-gray-50 shadow-md z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Lireddit</span>
          </a>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/">
            <a className="mr-5 active:bg-indigo-600 hover:text-indigo-600">
              Home
            </a>
          </Link>
          <Link href="/create-post">
            <a className="mr-5 hover:text-indigo-600">Post</a>
          </Link>
          <a className="mr-5 hover:text-gray-900">Services</a>
          {!fetching && !data?.me ? (
            <Link href="/register">
              <a className="mr-5 hover:text-indigo-600">Register</a>
            </Link>
          ) : (
            <a className="mr-5 hover:text-gray-900">Contact</a>
          )}
        </nav>
        {!fetching && !data?.me ? (
          <Link href="/login">
            <a>
              <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-base mt-4 md:mt-0">
                Login
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </a>
          </Link>
        ) : (
          <div>
            {data?.me?.username}
            <button
              disabled={logoutFetching}
              onClick={() => {
                return logout();
              }}
              style={{ minWidth: "70px" }}
              className="ml-4 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-base mt-4 md:mt-0"
            >
              {logoutFetching ? (
                <div style={{ color: "black" }} className="loader">
                  Loading...
                </div>
              ) : (
                <>
                  Logout
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
