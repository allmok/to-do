import React, { useState } from 'react';
import { Box, CssBaseline, Paper, Divider, Fab, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import AddIcon from '@mui/icons-material/Add';
import { initialTasks, initialColumns, initialColumnOrder } from './initial-data';
import { KanbanColumn } from './components/KanbanColumn';
import theme from './theme';
import type { Column, Task } from './interfaces/Kanban';

interface BoardState {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}

function App() {
  const [boardState, setBoardState] = useState<BoardState>({
    tasks: initialTasks,
    columns: initialColumns,
    columnOrder: initialColumnOrder,
  });

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState('');

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    const startColumn = boardState.columns[source.droppableId];
    const finishColumn = boardState.columns[destination.droppableId];
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...startColumn, taskIds: newTaskIds };
      setBoardState(prevState => ({ ...prevState, columns: { ...prevState.columns, [newColumn.id]: newColumn } }));
      return;
    }
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = { ...startColumn, taskIds: startTaskIds };
    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = { ...finishColumn, taskIds: finishTaskIds };
    setBoardState(prevState => ({ ...prevState, columns: { ...prevState.columns, [newStartColumn.id]: newStartColumn, [newFinishColumn.id]: newFinishColumn } }));
  };

  const handleAddTask = () => {
    if (!newTaskContent.trim()) return;

    const taskId = `task-${Date.now()}`;
    const newTask: Task = { id: taskId, content: newTaskContent };
    const firstColumn = boardState.columns[boardState.columnOrder[0]]; 

    setBoardState(prevState => ({
      ...prevState,
      tasks: { ...prevState.tasks, [taskId]: newTask },
      columns: {
        ...prevState.columns,
        [firstColumn.id]: {
          ...firstColumn,
          taskIds: [...firstColumn.taskIds, taskId],
        },
      },
    }));

    setNewTaskContent('');
    setAddDialogOpen(false);
  };

  const handleEditTask = (taskId: string, newContent: string) => {
    if (!newContent.trim()) return;
    setBoardState(prevState => ({
      ...prevState,
      tasks: {
        ...prevState.tasks,
        [taskId]: { ...prevState.tasks[taskId], content: newContent },
      },
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', top: 24, left: 24 }}
        onClick={() => setAddDialogOpen(true)}
      >
        <AddIcon />
      </Fab>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 4 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Paper sx={{ p: 3, borderRadius: 8, width: 'fit-content', minWidth: 1000 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {boardState.columnOrder.map((columnId, index) => {
                const column = boardState.columns[columnId];
                const tasks = column.taskIds.map(taskId => boardState.tasks[taskId]);
                return (
                  <React.Fragment key={column.id}>
                    <KanbanColumn
                      column={column}
                      tasks={tasks}
                      editTask={handleEditTask} 
                    />
                    {index < boardState.columnOrder.length - 1 && <Divider orientation="vertical" flexItem />}
                  </React.Fragment>
                );
              })}
            </Box>
          </Paper>
        </DragDropContext>
      </Box>

      <Dialog open={isAddDialogOpen} onClose={() => setAddDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Створити нове завдання</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Назва завдання"
            type="text"
            fullWidth
            variant="filled"
            value={newTaskContent}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setNewTaskContent(e.target.value)}
            onKeyDown={(e: { key: string; }) => e.key === 'Enter' && handleAddTask()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Скасувати</Button>
          <Button onClick={handleAddTask} variant="contained">Додати</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default App;