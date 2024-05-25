"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
const PromptCardList = ({ data, hadnleTagClick }) => {
  return (
    <div className="mt-16 flex-wrap flex justify-center prompt_layout">
      {data.map((post) => {
        console.log(post)
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
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    // fetch data from the server
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
      console.log("data = ", data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
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
