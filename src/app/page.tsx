import React from "react";
export default function Home() {
  return (
    <div className="flex w-full flex-col justify-center items-center">
      <h1 className="text-center flex flex-col justify-center items-center head_text">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Promots</span>
      </h1>
      <p className="desc text-center">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur
        dolores quia, sint obcaecati officiis iste sunt aperiam exercitationem
        praesentium officia nisi, enim, mollitia quae maiores nesciunt quod cum
        aspernatur alias.
      </p>
    </div>
  );
}
