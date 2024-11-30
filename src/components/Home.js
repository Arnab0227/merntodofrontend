import React from "react";

export default function Home({ helmet, navigate, isAuthenticated }) {
  const words = ["TODO", "LIST", "APP"];
  const delays = [0, 0.3, 0.6];

  const handleClick = () => {
    navigate("/todos");
  };

  return (
    <div>
      {helmet}

      <div className="flex justify-center pt-10">
        <div className="flex justify-center pt-10">
          {words.map((word, index) => (
            <div
              key={index}
              className="text-6xl inline-block motion-safe:animate-bounce mx-5"
              style={{ animationDelay: `${delays[index]}s` }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
      <div className=" pt-16 flex items-center justify-center text-center text-xl">
        <div className="w-2/3 animate-pulse bg-clip-text text-transparent bg-gradient-to-tr from-black from-20%  via-slate-400 to-black">
          Experience the ultimate productivity boost with this minimalist To-Do
          List App designed with a sleek, feature-light approach for seamless
          task management. Crafted single-handedly, this project is a testament
          to my dedication and expertise in delivering efficient solutions.
        </div>
      </div>

      {isAuthenticated ? (
        <div className="pt-16 flex items-center justify-center text-center text-xl cursor-pointer">
          <button
            className="border-2 border-black px-3 py-2 rounded-lg bg-black text-white hover:bg-white hover:text-black shadow-xl"
            onClick={handleClick}
          >
            {" "}
            Go To the Todos page{" "}
          </button>{" "}
        </div>
      ) : (
        <div className="text-slate-400 flex justify-center mt-36 animate-pulse">
          Sign up if you are a first-time visitor; normally, login.
        </div>
      )}
        <div className="text-slate-400 flex justify-center mt-24 animate-pulse">
          I am using a free tier, it will cold start, wait for a while initially after login/signup.
        </div>
    </div>
  );
}
