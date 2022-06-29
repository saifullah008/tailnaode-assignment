import React from "react";

const TodoForm = ({ handleSubmit, handleReset, todo, editId, setTodo }) => {
  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit"> {editId ? "Edit" : "Add"}</button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};

export default TodoForm;
