"use client";

import React from "react";
import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

export default function MyProfile() {
  // const { data: session } = useSession();
  const [session, setSession] = useState(null);
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setSession(JSON.parse(token));
    }
    console.log(token);
    // fetch data from the server
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${JSON.parse(token).email.S}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    // if (session?.user.id) fetchPosts();
    fetchPosts();
  }, []);
  function handleEdit(post) {
    router.push(`/update-prompt?id=${post.id}`);
  }
  function handleDelete(post) {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (hasConfirmed) {
      fetch(`/api/prompt/${post.id}`, {
        method: "DELETE",
      });
      setPosts(posts.filter((p) => p.id !== post.id));
    }
  }
  return (
    <div>
      <Profile
        name="My"
        desc="welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      ></Profile>
    </div>
  );
}
