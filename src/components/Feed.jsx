"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import PromptCard from "./PromptCard";
const PromptCardList = ({ data, hadnleTagClick }) => {
  return (
    <div className="mt-16 flex-wrap flex justify-center prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={hadnleTagClick}
          ></PromptCard>
        );
      })}
    </div>
  );
};
export default function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`/api/${searchText}`);
    const data = await res.json();
    setPosts(data);
  }
  const fetchPosts = async () => {
    const res = await fetch("/api/prompt", { cache: "no-store" });
    const data = await res.json();
    setPosts(data);
  };
  useEffect(() => {
    // fetch data from the server
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <button
        className={`${loading ? " animate-spin" : ""} self-end`}
        onClick={async () => {
          setLoading(true);
          await fetchPosts();
          setLoading(false);
        }}
      >
        <Image
          width={30}
          height={30}
          src="/assets/icons/refresh.svg"
          alt="Refresh Feed"
        ></Image>
      </button>
      <form
        onSubmit={handleSubmit}
        action=""
        className="relative w-full flex-center"
      >
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} hadnleTagClick={() => {}}></PromptCardList>
    </section>
  );
}
