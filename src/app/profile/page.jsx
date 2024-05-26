"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

export default function MyProfile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    // fetch data from the server
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session]);
  function handleEdit(post) {
    console.log("post", post);
    router.push(`/update-prompt?id=${post._id}`);
  }
  function handleDelete(post) {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if(hasConfirmed){
      fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });
      setPosts(posts.filter((p) => p._id !== post._id));
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
