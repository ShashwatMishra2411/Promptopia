"use client";

import React, { useEffect, useState, Suspense } from "react";
// import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Form from "@/components/Form";
import { GoogleGenerativeAI } from "@google/generative-ai";

function UpdatePromptComponent() {
  const searchParams = useSearchParams();
  console.log(searchParams.get("id"));
  const router = useRouter();
  const promptId = searchParams.get("id"); // Access the 'id' query parameter
  // const { data: session } = useSession();
  const [session, setSession] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
    response: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token = " + token);
    if (token) {
      const data = JSON.parse(token);
      setSession({
        user: { email: data.email.S, name: data.name.S },
      });
    }
    if (promptId) {
      const getPromptDetails = async () => {
        const res = await fetch(`/api/prompt/${promptId}`);
        const data = await res.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
          response: data.response,
        });
      };

      getPromptDetails();
    }
  }, [promptId]);

  async function generatePrompt() {
    setSubmitting(true);
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_API_KEY
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(post.prompt);
      const response = await result.response;
      const text = await response.text();
      setPost({ ...post, response: text });
    } catch (error) {
      console.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(session);
    if (!promptId) return alert("Prompt not found");

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          response: post.response,
          userId: JSON.parse(localStorage.getItem("token")).email.S,
        }),
      });

      if (res.ok) {
        setPost({ prompt: "", tag: "", response: "" });
        router.push("/");
      }
    } catch (e) {
      console.error(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
        generate={true}
        generatePrompt={generatePrompt}
      />
    </div>
  );
}

export default function UpdatePrompt() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePromptComponent />
    </Suspense>
  );
}
