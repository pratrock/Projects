import React, { useState, useEffect } from "react";
import "./Todo.css";
import { useTheme } from "../context/ThemeContext";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Todo: React.FC = () => {
  const { theme } = useTheme();

  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInputText("");
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTodo(inputText);
    }
  };

  const toggleCompletion = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Pending") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  return (
    <div className={`todo-container ${theme}`}>
      <h1>Todo List App</h1>
      <div className="menu">
        <button
          onClick={() => setFilter("All")}
          className={filter === "All" ? "active-tab" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Pending")}
          className={filter === "Pending" ? "active-tab" : ""}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("Completed")}
          className={filter === "Completed" ? "active-tab" : ""}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={todo.completed ? "completed" : ""}
            onClick={() => toggleCompletion(todo.id)}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompletion(todo.id)}
              className="todo-checkbox"
            />
            <span>{todo.text}</span>
            <span
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
            >
              X
            </span>
          </li>
        ))}
      </ul>

      <div className="add-todo-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add todo"
          className="add-todo-input"
        />
        <button onClick={() => addTodo(inputText)} className="add-todo-button">
          Add
        </button>
      </div>
    </div>
  );
};

export default Todo;
