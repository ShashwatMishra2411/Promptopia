"use client";

import React from "react";
import Feed from "@/components/Feed";
export default function Home() {
  return (
    <div className="flex w-full flex-col justify-center items-center">
      <h1 className="text-center flex flex-col justify-center items-center head_text">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Promots</span>
      </h1>
      <p className="desc text-center">
        This app is a community-driven platform that leverages AI technology to
        generate and share creative prompts. Users can input various prompts
        into the application, which are then processed by the advanced AI model,
        Gemini. The AI generates responses to these prompts, which are
        subsequently posted to a public feed. The feed serves as a collaborative
        space where users can view, engage with, and be inspired by the diverse
        range of AI-powered responses. The platform aims to foster creativity,
        knowledge sharing, and collaborative learning through the innovative use
        of AI-generated content.
      </p>
      <Feed></Feed>
    </div>
  );
}
