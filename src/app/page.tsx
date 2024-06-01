"use client";

import React from "react";
import Feed from "@/components/Feed";

export default function Home() {
  return (
    <div className="flex w-full flex-col justify-center items-center">
      <h1 className="text-center flex flex-col justify-center items-center head_text">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Welcome to our vibrant community platform where creativity meets technology.
        Generate innovative prompts with AI, share your unique ideas, and explore a collaborative feed.
        Join us in inspiring creativity and fostering knowledge sharing through AI-powered interactions.
      </p>
      <Feed />
    </div>
  );
}
