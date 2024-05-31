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
        A community platform to generate and share creative prompts using AI.
        Input prompts, see AI-generated responses, and engage with a collaborative feed
        to inspire creativity and knowledge sharing.
      </p>
      <Feed />
    </div>
  );
}
