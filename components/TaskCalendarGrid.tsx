import React, { useState } from 'react';
import { format, eachDayOfInterval, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

interface Task {
  id: string;
  name: string;
}

interface CompletionStatus {
  [key: string]: boolean; // taskId-date: boolean
}

interface TaskCalendarGridProps {
  tasks: Task[];
}

const TaskCalendarGrid = ({ tasks }: TaskCalendarGridProps) => {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);
  
  const dates = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  const [completionStatus, setCompletionStatus] = useState<CompletionStatus>({});
  
  const toggleTaskCompletion = (taskId: string, date: Date) => {
    const key = `${taskId}-${format(date, 'yyyy-MM-dd')}`;
    setCompletionStatus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isTaskCompleted = (taskId: string, date: Date): boolean => {
    const key = `${taskId}-${format(date, 'yyyy-MM-dd')}`;
    return !!completionStatus[key];
  };

  return (
    <Card className="p-4 bg-white">
      <div className="grid grid-cols-[150px_repeat(7,1fr)] gap-2">
        <div className="font-bold text-gray-700">Tasks</div>
        {dates.map(date => (
          <div 
            key={date.toString()} 
            className="text-center font-semibold text-sm text-gray-600"
          >
            <div>{format(date, 'EEE')}</div>
            <div>{format(date, 'd')}</div>
          </div>
        ))}
        
        {tasks.map(task => (
          <React.Fragment key={task.id}>
            <div className="flex items-center text-sm text-gray-700">
              {task.name}
            </div>
            {dates.map(date => (
              <div 
                key={`${task.id}-${date.toString()}`}
                className="flex justify-center items-center border border-gray-100"
              >
                <Checkbox
                  checked={isTaskCompleted(task.id, date)}
                  onCheckedChange={() => toggleTaskCompletion(task.id, date)}
                  disabled={!isSameDay(date, today)}
                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 disabled:opacity-50 disabled:bg-gray-300 disabled:border-gray-400 disabled:cursor-not-allowed"
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};

export default TaskCalendarGrid;