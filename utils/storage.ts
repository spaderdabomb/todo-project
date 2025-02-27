import { Task } from "@/components/TaskItem"

const TASKS_STORAGE_KEY = 'tasks';

export const loadTasks = (): Task[] => {
  if (typeof window === 'undefined') return []; // Handle server-side rendering
  
  const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
  return savedTasks ? JSON.parse(savedTasks) : [];
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};