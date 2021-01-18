import { useState, useEffect } from "react";
import axios from "axios";
import Todos from "./components/Todos";
import Loader from "./components/Loader";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import "./App.css";

const App = () => {
  // initialization of todos array as null
  const [todos, setTodos] = useState(null);

  const [confirmDeleteTodo, setConfirmDeleteTodo] = useState(false);
  const [confirmUpdateTodo, setConfirmUpdateTodo] = useState(true);

  useEffect(() => {
    // Get the data from backend
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5001");
      // set the todos array with data from backend
      setTodos(res.data);
    };

    fetchData();

    setConfirmDeleteTodo(false);
    setConfirmUpdateTodo(true);
  }, [confirmUpdateTodo, confirmDeleteTodo]);

  // Create a todo
  const createTodo = async (text, user) => {
    // Post a todo with the data from frontend
    const res = await axios.post("http://localhost:5001", {
      title: text,
      userId: user,
      completed: false,
    });
    // set the todos array with the new data
    setTodos(res.data);
  };

  // delete a todo by id
  const deleteTodo = async (id) => {
    setConfirmDeleteTodo(true);
    await axios.delete(`http://localhost:5001/${id}`);
  };

  // update a todo to completed by id
  const updateTodo = async (id) => {
    await axios.put(`http://localhost:5001/${id}`, {
      completed: confirmUpdateTodo,
    });
    setConfirmUpdateTodo(false);
    console.log(id, confirmUpdateTodo);
  };

  return (
    <div className="container">
      <Header />
      <TodoInput createTodo={createTodo} />
      {/* if there is no data in todos array there will be a loader */}
      {!todos && <Loader />}
      {/* if data exist we send to Todos component */}
      {todos && (
        <Todos todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      )}
    </div>
  );
};

export default App;
