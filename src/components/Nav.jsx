"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, signOut, signIn, getProviders } from "next-auth/react";

export default function Nav() {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    fetchProviders();
  }, []);
  return (
    <nav className="flex-between">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        ></Image>
        <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-post" className="black_btn">
              Create Post
            </Link>
            <button className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                width={37}
                height={37}
                alt="profile"
                src="/assets/images/logo.svg"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign In
                </button>;
              })}
          </>
        )}
      </div>
      {/* {Mobile Navigation} */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex gap-1 md:gap-5">
            <Image
              width={37}
              height={37}
              alt="profile"
              src="/assets/images/logo.svg"
              className="rounded-full"
              onClick={() => {
                setToggleDropDown((prev) => {
                  return !prev;
                });
              }}
            ></Image>
            {toggleDropDown && (
              <div className="dropdown !justify-center !items-center">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign In
                </button>;
              })}
          </>
        )}
      </div>
    </nav>
  );
}
