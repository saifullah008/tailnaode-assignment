import React from "react";

const TodoList = ({ todos, handleDelete, handleCheckbox, handleEdit }) => {
  return (
    <ul className="allTodos">
      {todos.map((t) => (
        <li className="singleTodo" key={t.id}>
          <span className="todoText">{t.todo}</span>
          <button onClick={() => handleEdit(t.id)}>Edit</button>
          <button onClick={() => handleDelete(t.id)}>Delete</button>
          <input
            className="checkbox"
            type="checkbox"
            onChange={() => handleCheckbox(t)}
          ></input>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
