"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function UpdatePrompt() {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  async function generatePrompt() {
    setSubmitting(true);
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_API_KEY
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(post.prompt);
      const response = await result.response;
      const text = response.text();
      setPost({ ...post, response: text });
    } catch (error) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  }
  const updateprompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert("Prompt not found");
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          response: post.response,
          userId: session.user.id,
        }),
      });
      if (res.ok) {
        setPost({ prompt: "", tag: "" });
        router.push("/");
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      setPost({ prompt: data.prompt, tag: data.tag, response: data.response });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);
  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updateprompt}
        generate={true}
        generatePrompt={generatePrompt}
      ></Form>
    </div>
  );
}
