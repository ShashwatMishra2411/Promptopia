"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";

export default function CreatePrompt() {
  const {data: session, status} = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const createprompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      console.log("hillo",post);
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session.user.id,
        }),
      });
      if (res.ok) {
        setPost({ prompt: "", tag: "" });
        router.push("/");
      }
    } catch (e) {
      console.log(e.message);
    }finally{
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createprompt}
      ></Form>
    </div>
  );
}
