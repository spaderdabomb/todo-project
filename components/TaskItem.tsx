import { Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export interface Task {
  id: string;
  name: string;
  checked: boolean;
}

interface TaskItemPopupProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (id: string, newName: string) => void;
}

const TaskItemPopup = ({ task, open, onOpenChange, onEdit }: TaskItemPopupProps) => {
  const [editedName, setEditedName] = useState(task.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedName.trim()) {
      onEdit(task.id, editedName.trim());
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md darkMode">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Task name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full"
          />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-800">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string) => void;
}

const TaskItem = ({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <li className="flex items-center justify-between space-x-2 py-0 px-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={task.checked}
            onChange={() => onToggle(task.id)}
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
          />
          <span className={task.checked ? "line-through text-gray-400" : ""}>
            {task.name}
          </span>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditDialogOpen(true)}
            className="text-gray-400 hover:text-blue-500 hover:bg-blue-100/10 px-2"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-500 hover:bg-red-100/10 p-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </li>

      <TaskItemPopup
        task={task}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onEdit={onEdit}
      />
    </>
  );
};

export { TaskItem, TaskItemPopup };