"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
export default function Layout({ children }) {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("hi", session?.user);
  return session?.user ? children : router.push("/");
}
