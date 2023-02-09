import React, { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
  _id: number;
  task: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);


  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get("http://localhost:8080/api/v1/task");
      setTodos(res.data.data.tasks);
    };
    fetchTodos();

    return () => {
      setTodos([]);
    }

  }, []);


  const addTodo = async (task: string) => {
    const res = await axios.post("http://localhost:8080/api/v1/task", {
      task,
      completed: false
    });
    setTodos([...todos, res.data]);
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`http://localhost:8080/api/v1/task/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));

  };


  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => {
        if (todo._id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <ul className="my-5">
        {
        todos.map(todo => (
          <li key={todo._id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id)}
              className="mr-2"
            />
            <span className={todo.completed ? "line-through" : ""}>
              {todo.task}
            </span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="bg-red-500 text-white px-2 py-1 rounded ml-auto"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e:any) => {
          e.preventDefault();
          addTodo(e.target[0].value);
          e.target[0].value = "";

        }}
        className="flex"
      >
        <input
          type="text"
          className="w-full border border-gray-400 px-2 py-1 mr-2"
        />
        <button className="bg-blue-500 text-white px-2 py-1 rounded">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default App;