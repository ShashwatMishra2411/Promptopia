"use client";
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ...
import React, { useEffect } from "react";
import { useState } from "react";
// import { useSession } from "next-auth/react";
import Form from "@/components/Form";

export default function CreatePrompt() {
  // const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [session, setSession] = useState(null);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
    response: "",
  });
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = JSON.parse(token);
      console.log(data);
      setSession({
        user: { email: data.email.S, name: data.name.S },
      });
    }
  }, []);
  const createprompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const result = await model.generateContent(post.prompt);
      const response = await result.response;
      const text = response.text();
      setPost({ ...post, response: text });
    } catch (e) {
      alert(e.message);
    } finally {
      setSubmitting(false);
    }
  };
  async function posting() {
    try {
      setSubmitting(true);
      console.log("session = " + session);
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          response: post.response,
          userId: JSON.parse(localStorage.getItem("token")).email.S,
        }),
      });
      if (res.ok) {
        setPost({ prompt: "", tag: "", response: "" });
      }
      console.log(res);
    } catch (e) {
      console.log(e.message);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={post.response ? posting : createprompt}
      ></Form>
    </div>
  );
}
