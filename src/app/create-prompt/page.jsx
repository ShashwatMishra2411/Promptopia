"use client";
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ...
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Form from "@/components/Form";

export default function CreatePrompt() {
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
    response: "",
  });
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const createprompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const result = await model.generateContent(post.prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      setPost({ ...post, response: text });
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          response: text,
          userId: session.user.id,
        }),
      });
      if (res.ok) {
        // setPost({ prompt: "", tag: "", response: "" });
        // router.push("/");
      }
    } catch (e) {
      alert(e.message);
    } finally {
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
