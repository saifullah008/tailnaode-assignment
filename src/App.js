import React, { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) ?? []
  );
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([
        { id: `${todo}-${Date.now()}`, completed: false, todo },
        ...todos,
      ]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };
  const handleReset = () => {
    if (todos.length > 0) {
      localStorage.removeItem("todos");
      window.location.reload();
    }
  };
  const handleCheckbox = (item) => {
    if (!item.completed) {
      item.completed = !item.completed;
      const completed = todos.find((i) => i.id === item.id);
      const newTodos = todos.filter((to) => to.id !== item.id);
      newTodos.push(completed);
      setTodos(newTodos);
    } else {
      item.completed = !item.completed;
      const completed = todos.find((i) => i.id === item.id);
      const newTodos = todos.filter((to) => to.id !== item.id);
      newTodos.unshift(completed);
      setTodos(newTodos);
      console.log("called");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <TodoForm
          handleSubmit={handleSubmit}
          handleReset={handleReset}
          todo={todo}
          editId={editId}
          setTodo={setTodo}
        />

        <TodoList
          todos={todos}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleCheckbox={handleCheckbox}
        />
      </div>
    </div>
  );
};

export default App;
