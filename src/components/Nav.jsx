"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();

  const [session, setSession] = useState(null); // Local state for session
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    // Fetch session from localStorage on initial load
    const token = localStorage.getItem("token");
    if (token) {
      setSession({
        user: { email: token.email, name: token.name },
      });
    }
  }, []);

  // Handle sign in
  const handleSignIn = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "user123@example.com",
        name: "Shashwat",
        password: "password123",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // Convert data.data to JSON string and store in localStorage
      localStorage.setItem("token", JSON.stringify(data.data));

      setSession({
        user: { email: data.data.email.S, name: data.data.name.S },
      });
      console.log(localStorage.getItem("token"));
      router.push("/"); // Redirect after successful login
    } else {
      console.error(data.message);
    }
  };

  const handleSignUp = async () => {
    console.log("hi");
    const urlData = await fetch("/api/listImages");
    const url = await urlData.json();
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "user123@example.com",
        name: "Shashwat",
        password: "password123",
        url: url[0],
      }),
    });
    if (!res.ok) {
      const data = await res.json();
      console.error(data.message);
      return;
    }
    console.log("User signed up successfully");
  };
  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setSession(null);
    router.push("/"); // Redirect after successful sign out
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={
                  localStorage.getItem("token")
                    ? JSON.parse(localStorage.getItem("token")).url.S
                    : "/logo.png"
                }
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <div className="flex gap-10">
            <button type="button" onClick={handleSignUp} className="black_btn">
              Sign Up
            </button>
            <button type="button" onClick={handleSignIn} className="black_btn">
              Sign in
            </button>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button type="button" onClick={handleSignIn} className="black_btn">
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}
