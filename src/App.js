import './App.css';
import Header from "./My Components/Header";
import Todos from "./My Components/Todos";
import Footer from "./My Components/Footer";
import AddTodo from './My Components/AddTodo';
import React, { useState, useEffect } from "react";

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodo);
  const [filteredTodos, setFilteredTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    setFilteredTodos(todos);
  }, [todos]);

  const onDelete = (todo) => {
    console.log("Deleting todo:", todo);
    setTodos(todos.filter((e) => e !== todo));
  };

  const addTodo = (title, desc) => {
    console.log("Adding todo:", title, desc);
    let sno = todos.length === 0 ? 0 : todos[todos.length - 1].sno + 1;

    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    };

    setTodos([...todos, myTodo]);
  };

  return (
    <>
      <Header title="My Todos List" searchBar={true} todos={todos} setFilteredTodos={setFilteredTodos} />
      <AddTodo addTodo={addTodo} />
      <Todos todos={filteredTodos} onDelete={onDelete} />
      <Footer />
    </>
  );
}

export default App;
