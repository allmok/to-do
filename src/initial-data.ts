import type { Task, Column } from './interfaces/Kanban';

export const initialTasks: { [key: string]: Task } = {
  'task-1': { id: 'task-1', content: 'Проаналізувати вимоги' },
  'task-2': { id: 'task-2', content: 'Створити UI/UX макет' },
  'task-3': { id: 'task-3', content: 'Розробити компоненти' },
  'task-4': { id: 'task-4', content: 'Написати документацію' },
};

export const initialColumns: { [key: string]: Column } = {
  'column-1': {
    id: 'column-1',
    title: 'To Do',
    taskIds: ['task-1', 'task-2'],
  },
  'column-2': {
    id: 'column-2',
    title: 'In Progress',
    taskIds: ['task-3'],
  },
  'column-3': {
    id: 'column-3',
    title: 'Done',
    taskIds: ['task-4'],
  },
};

export const initialColumnOrder: string[] = ['column-1', 'column-2', 'column-3'];