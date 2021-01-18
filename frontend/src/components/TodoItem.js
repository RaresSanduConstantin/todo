import "./TodoItem.css";

const TodoItem = ({ todo, deleteTodo, updateTodo }) => {
  // Get the todo id, and call the deleteTodo
  const deleteHandler = (id) => {
    if (window.confirm("Doriti sa stergeti acest todo?")) {
      deleteTodo(id);
    }
  };

  // Get the id and call updateTodo
  const updateHandler = (id) => {
    updateTodo(todo.id);
  };

  return (
    <div className="containerTodos">
      <div className="todoItem gg">
        <h1 className="todoItemH1">Name: {todo.userId}</h1>
        {todo.completed ? (
          <h1 className="fitcontent done todoItemH1">Task: {todo.title}</h1>
        ) : (
          <h1 className="fitcontent undone todoItemH1">Task: {todo.title}</h1>
        )}
        <button
          className="buttonDelete"
          onClick={(id) => {
            deleteHandler(todo.id);
          }}
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <button className="buttonUpdate" onClick={updateHandler}>
          <i class="far fa-check-circle"></i>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
