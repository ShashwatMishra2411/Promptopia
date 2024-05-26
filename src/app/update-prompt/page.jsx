"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

export default function UpdatePrompt() {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const router = useRouter();
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

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
      setPost({ prompt: data.prompt, tag: data.tag });
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
      ></Form>
    </div>
  );
}
