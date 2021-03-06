import React, { useRef } from "react";
import "./TodoInput.css";

const TodoInput = ({ createTodo }) => {
  const todoInputText = useRef("");
  const todoInputUser = useRef("");
  const todoInputCompleted = useRef(false);

  // Get the data from inputs and call createTodo with the values seted
  const submitHandler = (e) => {
    e.preventDefault();

    createTodo(
      todoInputText.current.value,
      todoInputUser.current.value,
      todoInputCompleted.current
    );
    todoInputText.current.value = "";
    todoInputUser.current.value = "";
  };

  return (
    <form onSubmit={submitHandler} className="formInput">
      <input
        className="input"
        type="text"
        ref={todoInputText}
        required
        placeholder="What do you need to do?"
      />
      <input
        className="input"
        type="text"
        ref={todoInputUser}
        required
        placeholder="Enter your name"
      />

      <input className="submit" type="submit" />
    </form>
  );
};

export default TodoInput;
