import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Url } from "./Url";
import { TbProgressCheck } from "react-icons/tb";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";

export default function Todo({ token }) {
  const [todos, setTodos] = useState([]);
  const [addTodoTitle, setAddTodoTitle] = useState("");
  const [addTodoDescription, setAddTodoDescription] = useState("");
  const [editingTodo, setEditingTodo] = useState({
    id: null,
    title: "",
    description: "",
  });
  const [isEditOpen, setIsEditOpen] = useState(false)
  console.log("Token:", token);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get(`${Url}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
      console.log(response.headers);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos, token]);

  const handleAddTodo = async () => {
    try {
      await axios.post(
        `${Url}/add-todo`,
        { title: addTodoTitle, description: addTodoDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTodos();
      setAddTodoTitle("");
      setAddTodoDescription("");
    } catch (error) {
      console.error("Add todo error:", error);
    }
  };

  const handleUpdateTodo = async (id, updatedData) => {
    try {
      await axios.put(`${Url}/update-todo/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTodos();
      setEditingTodo({ id: null, title: "", description: "" });
      setIsEditOpen(false)
    } catch (error) {
      console.error("Update todo error:", error);
    }
  };
  const handleUpdateButtonClick = (id, newTitle, newDescription) => {
        if (!newTitle || !newDescription) {
          return;
        }
        handleUpdateTodo(id, { title: newTitle, description: newDescription });
      };

  const handleToggleTodo = async (id, checked) => {
    try {
      await axios.put(
        `${Url}/update-todo/${id}`,
        { completed: checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: checked } : todo
        )
      );
    } catch (error) {
      console.error("Toggle todo error:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${Url}/remove-todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTodos();
    } catch (error) {
      console.error("Delete todo error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="py-10 text-5xl">Your Todos</div>
      <div className="flex flex-col items-center">
        <div className="mb-8">
          <input
            type="text"
            value={addTodoTitle}
            placeholder="Title"
            onChange={(e) => setAddTodoTitle(e.target.value)}
            className="w-40 px-2 py-1 border-2 border-dotted border-gray-400 text-2xl rounded focus:outline-none"
          />
          <input
            type="text"
            value={addTodoDescription}
            placeholder="Description"
            onChange={(e) => setAddTodoDescription(e.target.value)}
            className="w-40 px-2 py-1 border-2 border-dotted border-gray-400 text-2xl rounded focus:outline-none ml-5"
          />
          <button
            onClick={handleAddTodo}
            className="ml-5 px-2 py-2 bg-black text-white rounded text-2xl"
          >
            Add Todo
          </button>
        </div>
        <div>
          <table className="w-full">
            <tbody>
              {todos.map((todo) => (
                <tr
                  key={todo._id}
                  className={`odd:bg-white even:bg-slate-50 ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {editingTodo.id === todo._id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={editingTodo.title}
                          onChange={(e) =>
                            setEditingTodo({
                              ...editingTodo,
                              title: e.target.value,
                            })
                          }
                          className="w-32 px-2 py-1 border-2 border-dotted border-gray-400 rounded focus:outline-none"
                        />
                      </td>
                      <td className="pl-4">
                        <input
                          type="text"
                          value={editingTodo.description}
                          onChange={(e) =>
                            setEditingTodo({
                              ...editingTodo,
                              description: e.target.value,
                            })
                          }
                          className="w-32 px-2 py-1 border-2 border-dotted border-gray-400 rounded focus:outline-none"
                        />
                      </td>
                      <td className="pb-2">
                         <button
                          onClick={() =>
                            handleUpdateButtonClick(
                              todo._id,
                              editingTodo.title,
                              editingTodo.description
                            )
                          }
                          className=" ml-3 px-6 py-2 bg-gray-400 text-black rounded"
                        >
                          SAVE
                        </button>
                      </td>
                      <td className="pl-4 pb-2">
                        <button
                          onClick={() => {
                            setEditingTodo({ id: null, title: "", description: "" })
                            setIsEditOpen(false);
                          }}
                          className="px-3 py-2 bg-black text-white font-semibold rounded"
                        >
                          CANCEL
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="pb-2 pl-4 w-32 text-3xl">{todo.title}</td>
                      <td className="pl-4 pb-2 w-32 text-3xl">
                        {todo.description}
                      </td>
                      <td className="pl-4 pb-2">
                        <button
                          onClick={() => handleDeleteTodo(todo._id)}
                          className="px-3 py-2 bg-gray-400 text-black rounded text-2xl"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="pl-4 pb-2">
                        <button
                          onClick={() => {
                            setEditingTodo({
                              id: todo._id,
                              title: todo.title,
                              description: todo.description,
                            })
                            setIsEditOpen(true);
                          }}
                          className="px-3 py-2 bg-black text-white rounded text-2xl"
                        >
                          Update
                        </button>
                      </td>
                    </>
                  )}
                  <td className="pl-4 pb-2 ">
                    {isEditOpen ? (
                      
                      <div className="w-6 h-6 text-gray-500 cursor-not-allowed">
                        {todo.completed ? (
                          <TbProgressCheck className="w-full h-full" />
                        ) : (
                          <RiCheckboxBlankCircleLine className="w-full h-full" />
                        )}
                      </div>
                    ) : (
                      
                      <>
                        {todo.completed ? (
                          <TbProgressCheck
                            className="w-6 h-6 text-gray-500 cursor-pointer"
                            onClick={() => handleToggleTodo(todo._id, false)}
                          />
                        ) : (
                          <RiCheckboxBlankCircleLine
                            className="w-6 h-6 text-gray-500 cursor-pointer"
                            onClick={() => handleToggleTodo(todo._id, true)}
                          />
                        )}
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={(e) =>
                            handleToggleTodo(todo._id, e.target.checked)
                          }
                          className="hidden"
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
