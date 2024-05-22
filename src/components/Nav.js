import React from "react";
import { Link } from "react-router-dom";
import { LuListTodo } from "react-icons/lu";

export default function Nav({
  handleLogout,
  username,
  navigate,
  isAuthenticated,
}) {
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="flex justify-between px-10 bg text-4xl text-white bg-black h-20 items-center rounded-b-lg">
        <div className="font-semibold flex space-x-10 items-center">
          <div className="cursor-pointer">
            <LuListTodo onClick={handleClick} />
          </div>
          <div className="cursor-pointer" onClick={handleClick}>
            Todos App
          </div>
        </div>
        <div className="space-x-10 flex">
          {isAuthenticated ? (
            <>
              <div>Welcome, {username}!</div>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
