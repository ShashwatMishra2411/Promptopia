import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
export default function PromptCard({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) {
  const [copied, setCopy] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  function handleCopy() {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopy("");
    }, 3000);
  }
  function toggleExpanded() {
    setIsExpanded((prev) => {
      return !prev;
    });
  }
  return (
    <div className="prompt_card">
      <div className="flex flex-col justify-between item-start gap-5">
        <div className="flex-1 flex flex-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-ful object-contain"
          ></Image>
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
          <div className="copy_btn ml-auto" onClick={handleCopy}>
            <Image
              alt="copy_icon"
              src={
                copied === post.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              width={12}
              height={12}
            ></Image>
          </div>
        </div>
        <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
        <div className="my-4 font-satoshi border-2 border-gray-500 px-3 py-2 text-sm  text-gray-700">
          <span className={isExpanded?"":"whitespace-nowrap !line-clamp-1"}>{post.response}</span>
          {!isExpanded && post.response.length > 100 && (
            <span
              className="font-inter whitespace-nowrap text-sm blue_gradient cursor-pointer"
              onClick={toggleExpanded}
            >
              Read more...
            </span>
          )}
          {isExpanded && (
            <span
              className="font-inter text-sm whitespace-nowrap blue_gradient cursor-pointer"
              onClick={toggleExpanded}
            >
              Show less
            </span>
          )}
        </div>
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => {
            handleTagClick && handleTagClick(post.tag);
          }}
        >
          #{post.tag}
        </p>
        {session?.user.id === post.creator._id && pathName === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={() => handleEdit(post)}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={() => {
                handleDelete(post);
              }}
            >
              Delete
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
