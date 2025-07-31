import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';
import { KanbanCard } from './KanbanCard';
import type { Task, Column } from '../interfaces/Kanban';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  editTask: (taskId: string, newContent: string) => void; 
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks, editTask }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'  }}>
      <Typography variant="h5" align="center" sx={{ p: 2 }}>{column.title}</Typography>
      <Divider sx={{ mb: 2 }} />
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              flexGrow: 1,
              minHeight: '500px',
              padding: '0 16px',
              transition: 'background-color 0.2s ease',
              backgroundColor: snapshot.isDraggingOver ? 'rgba(0,0,0,0.05)' : 'transparent',
            }}
          >
            {tasks.map((task, index) => (
              <KanbanCard
                key={task.id}
                task={task}
                index={index}
                editTask={editTask} 
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
};