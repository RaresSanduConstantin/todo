import { useState, useEffect } from "react";
import axios from "axios";
import Todos from "./components/Todos";
import Loader from "./components/Loader";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";

import "./App.css";

function App() {
  const [todos, setTodos] = useState(null);
  const [confirmDeleteTodo, setConfirmDeleteTodo] = useState(false);
  const [confirmUpdateTodo, setConfirmUpdateTodo] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5001");
      setTodos(res.data);
    };

    fetchData();
    setConfirmDeleteTodo(false);
  }, [confirmUpdateTodo, confirmDeleteTodo]);

  const createTodo = async (text, user, completed) => {
    const res = await axios.post("http://localhost:5001", {
      title: text,
      userId: user,
      completed: false,
    });
    setTodos(res.data);
  };

  const deleteTodo = async (id) => {
    setConfirmDeleteTodo(true);
    await axios.delete(`http://localhost:5001/${id}`);
  };

  const updateTodo = async (id) => {
    await axios.put(`http://localhost:5001/${id}`, {
      completed: confirmUpdateTodo,
    });
    console.log(id, confirmUpdateTodo);
    setConfirmUpdateTodo(false);
  };

  return (
    <div className="container">
      <Header />
      <TodoInput createTodo={createTodo} />
      {!todos && <Loader />}
      {todos && (
        <Todos todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      )}
    </div>
  );
}

export default App;
