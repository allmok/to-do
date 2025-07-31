import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface AddTodoFormProps {
  addTodo: (text: string) => void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1, mb: 2 }}
    >
      <TextField
        label="New ToDo"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        +
      </Button>
    </Box>
  );
};
