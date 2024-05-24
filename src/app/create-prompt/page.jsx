"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Form from "@/components/Form";

export default function CreatePrompt() {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const createprompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try{
const res = await fetch("/api/prompt/new",{
  method: "POST",
  body:JSON.stringify({
    prompt:post.prompt,
    tag:post.tag,
    userId:session.user.id,
  })
})
    }catch(e){
      console.log(e.message)
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
