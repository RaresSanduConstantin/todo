import { useState } from "react";
import "./TodoItem.css";
import axios from "axios";

const TodoItem = ({ todo, deleteTodo, updateTodo }) => {
  const [done, setDone] = useState(true);

  const deleteHandler = (id) => {
    if (window.confirm("Doriti sa stergeti acest todo?")) {
      deleteTodo(id);
    }
  };

  const updateHandler = (id) => {
    updateTodo(todo.id);
  };

  return (
    <div className="todoItem">
      <h1>UserId: {todo.userId}</h1>
      {todo.completed ? (
        <h1 className="fitcontent done">Task: {todo.title}</h1>
      ) : (
        <h1 className="fitcontent undone">Task: {todo.title}</h1>
      )}
      <button
        className="submit"
        onClick={(id) => {
          deleteHandler(todo.id);
        }}
      >
        Delete Todo
      </button>
      <button className="submit" onClick={updateHandler}>
        Update Todo
      </button>
    </div>
  );
};

export default TodoItem;
