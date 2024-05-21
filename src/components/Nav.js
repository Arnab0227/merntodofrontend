import React from "react";
import { Link } from "react-router-dom";
import { LuListTodo } from "react-icons/lu";

export default function Nav({ handleLogout, username }) {
  const auth = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = auth && auth.token;

 

  return (
    <div>
      <div className="flex justify-between px-10 bg text-4xl text-white bg-black h-20 items-center rounded-b-lg">
        <div className="font-semibold flex space-x-10 items-center">
          <div>
            <LuListTodo />
          </div>
          <div>Todos App</div>
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
