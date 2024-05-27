"use client";
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ...
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";

export default function CreatePrompt() {
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  // ...

  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const createprompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // const prompt = "Write a story about a magic backpack."

      const result = await model.generateContent(post.prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
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
