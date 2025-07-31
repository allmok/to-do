import React from "react";
import { List } from "@mui/material";
import { TodoItem } from "./TodoItem";
import type { Todo } from "../interfaces/Todo";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <List>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </List>
  );
};
