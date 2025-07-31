import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import type { Todo } from './interfaces/Todo';
import pastelTheme from './theme'; 

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };


  return (
    <ThemeProvider theme={pastelTheme}>
      <CssBaseline /> 
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          To-Do List
        </Typography>
        <AddTodoForm addTodo={addTodo} />
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </Container>
    </ThemeProvider>
  );
};

export default App;