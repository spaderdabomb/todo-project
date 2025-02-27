// components/AddTaskButton.tsx
import React from "react";

interface AddTaskButtonProps {
  onClick?: () => void; // Optional onClick handler
  className?: string; // Optional custom class names
}

export default function AddTaskButton({ onClick, className }: AddTaskButtonProps) {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
      onClick={onClick}
    >
      Add Task
    </button>
  );
}