import React from "react";
import Link from "next/link";
import Markdown from "react-markdown";

export default function Form({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
  generate,
  generatePrompt,
}) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>
      <form
        action=""
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col  gap-7 glassmorphism"
      >
        <label htmlFor="">
          <span className="font-satoshi font-semiold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value });
            }}
            className="form_textarea"
            placeholder="Write your prompt here..."
          ></textarea>
        </label>
        <label htmlFor="">
          <span className="font-satoshi font-semiold text-base text-gray-700">
            Tag <span>(#product, #web, #ideas)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
            className="form_input"
            placeholder="#tag"
          ></input>
        </label>
        <label htmlFor="">
          <span className="font-satoshi font-semiold text-base text-gray-700">
            Response
          </span>
          <div
            // onChange={(e) => {
            //   setPost({ ...post, response: e.target.value });
            // }}
            className="form_input overflow-hidden flex flex-col"
            placeholder="Response here..."
          >
            <Markdown>{post.response}</Markdown>
          </div>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          {generate ? (
            <button
              type="button"
              className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
              disabled={submitting}
              onClick={generatePrompt}
            >
              {submitting ? "Generating..." : "Generate"}
            </button>
          ) : null}
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            disabled={submitting}
          >
            {post.response
              ? submitting
                ? `Posting...`
                : "Post"
              : submitting
              ? `${type}...`
              : type}
          </button>
        </div>
      </form>
    </section>
  );
}
