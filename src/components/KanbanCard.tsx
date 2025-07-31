import React, { useState } from 'react';
import { Paper, Typography, TextField, Box } from '@mui/material';
import { Draggable } from '@hello-pangea/dnd';
import type { Task } from '../interfaces/Kanban';

interface KanbanCardProps {
  task: Task;
  index: number;
  editTask: (taskId: string, newContent: string) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task, index, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.content);

  const handleSave = () => {
    if (text.trim()) {
      editTask(task.id, text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSave();
    } else if (event.key === 'Escape') {
      setText(task.content);
      setIsEditing(false);
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          sx={{ mb: 1 }}
          onClick={() => !isEditing && setIsEditing(true)} 
        >
          {isEditing ? (
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={text}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setText(e.target.value)}
              onBlur={handleSave} 
              onKeyDown={handleKeyDown}
              autoFocus
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                  backgroundColor: '#c0cdda',
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          ) : (
            <Paper
              sx={{
                padding: '8px 16px',
                borderRadius: '50px',
                boxShadow: 'none',
                cursor: 'pointer',
              }}
            >
              <Typography variant="body1">{task.content}</Typography>
            </Paper>
          )}
        </Box>
      )}
    </Draggable>
  );
};