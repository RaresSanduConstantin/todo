import TodoItem from "./TodoItem";

const Todos = ({ todos, deleteTodo, updateTodo }) => {
  // Map the todos from parent App.js and for each todo create a TodoItem component with the key=todo.id
  return todos.map((todo) => (
    <TodoItem
      todo={todo}
      key={todo.id}
      deleteTodo={deleteTodo}
      updateTodo={updateTodo}
    />
  ));
};

export default Todos;
