import React from "react";
import { ListItem, ListItemText, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Todo } from "../interfaces/Todo";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => deleteTodo(todo.id)}
        >
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <Checkbox
        edge="start"
        checked={todo.completed}
        tabIndex={-1}
        disableRipple
        onClick={() => toggleTodo(todo.id)}
      />
      <ListItemText
        primary={todo.text}
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      />
    </ListItem>
  );
};
