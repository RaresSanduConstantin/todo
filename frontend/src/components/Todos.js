import TodoItem from "./TodoItem";

const Todos = ({ todos, deleteTodo, updateTodo }) => {
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
