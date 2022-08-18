import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    const newTodos = [...todos];
    countComplete();
    setTodos(newTodos);
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed;
    setTodos([...todos]);
    countComplete();
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const idy = idx - 1;
    const todoTemp1 = todos[idy];

    todos[idy] = todos[idx];
    todos[idx] = todoTemp1;
    setTodos([...todos]);
  };

  const moveDown = (idx) => {
    if (idx === todos.length - 1) return;
    const idy = idx + 1;
    const todoTemp1 = todos[idy];

    todos[idy] = todos[idx];
    todos[idx] = todoTemp1;
    setTodos([...todos]);
  };
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([
    { title: "Play Game", completed: false },
    { title: "Read book", completed: false },
  ]);
  const [completedCounter, setCompletedCounter] = useState(0);
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      countComplete();
      return;
    }
    saveTodos();
    countComplete();
  }, [todos]);

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const todoStr = localStorage.getItem("react-todos");
    if (todoStr === null) {
      setTodos([]);
    } else setTodos(JSON.parse(todoStr));
  }, []);

  const onClickEnterHandler = () => {
    const newTodos = [{ title: todoInput, completed: false }, ...todos];
    setTodos(newTodos);
    countComplete();
    setTodoInput("");
  };
  const saveTodos = () => {
    const todoStr = JSON.stringify(todos);
    localStorage.setItem("react-todos", todoStr);
  };
  const countComplete = () => {
    let counter = 0;

    for (let x of todos) {
      if (x.completed) counter++;
    }
    setCompletedCounter(counter);
  };

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          onKeyUp={(event) => {
            if (event.key !== "Enter") return;
            if (event.target.value == "") {
              alert("Todo cannot be empty");
              return;
            }
            onClickEnterHandler();
          }}
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onChange={(event) => {
            setTodoInput(event.target.value);
          }}
          value={todoInput}
        />
        {/* Todos */}
        {/* Example 1 */}
        {/* <div className="border-bottom p-1 py-2 fs-2 d-flex gap-2">
          <span className="me-auto">Todo</span>
        </div> */}
        {/* Example 2 */}
        {/* <div className="border-bottom p-1 py-2 fs-2 d-flex gap-2">
          <span className="me-auto">Todo with buttons</span>

          <button className="btn btn-success">
            <IconCheck />
          </button>
          <button className="btn btn-secondary">
            <IconArrowUp />
          </button>
          <button className="btn btn-secondary">
            <IconArrowDown />
          </button>
          <button className="btn btn-danger">
            <IconTrash />
          </button>
        </div> */}
        <div>
          {todos.map((todo, i) => (
            <Todo
              title={todo.title}
              completed={todo.completed}
              key={i}
              onDelete={() => deleteTodo(i)}
              onMark={() => markTodo(i)}
              onMoveUp={() => moveUp(i)}
              onMoveDown={() => moveDown(i)}
            />
          ))}
        </div>
        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">
            Pending ({todos.length - completedCounter}){" "}
          </span>
          <span className="text-success">Completed ({completedCounter})</span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Supasan Ruangchutipopan 640610671
        </p>
      </div>
    </div>
  );
}
