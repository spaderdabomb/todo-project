"use client"; // Required for using React hooks in Next.js

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { User } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";

import AddTaskButton from "@/components/AddTaskButton";
import AddTaskDialog from "@/components/AddTaskDialog";
import TaskCalendarGrid from "@/components/TaskCalendarGrid";
import { TaskItem, Task } from "@/components/TaskItem";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";

import { loadTasks, saveTasks } from "@/utils/firebaseStorage";

export default function Home() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dailyTasks, setDailyTasks] = useState<Task[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/auth");
      } else {
        setUser(currentUser);
        setLoading(false);
        await fetchUserData(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchUserData = async (userId: string) => {
    // const userRef = doc(db, "users", userId);
    // const userSnap = await getDoc(userRef);

    const userTasks = await loadTasks(userId);
    setTasks(userTasks);
  };

  const updateTasks = async (newTasks: Task[]) => {
    setTasks(newTasks);
    if (user) {
      await saveTasks(user.uid, newTasks);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/auth");
  };

  const handleAddTask = (taskText: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      name: taskText,
      checked: false,
    };
    updateTasks([...tasks, newTask]);
    setDailyTasks(dailyTasks);
  };

  const handleToggleTask = (taskId: string) => {
    updateTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    updateTasks(tasks.filter((task) => task.id !== taskId));
    
  };

  const handleEditTask = (taskId: string, newName: string) => {
    updateTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, name: newName } : task
      )
    );
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      {/* Profile Section */}
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        )}
        <span className="font-semibold">{user?.displayName}</span>
        <button
          onClick={handleSignOut}
          className="px-3 py-1 bg-red-500 hover:bg-red-700 rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar
        onTabClick={setActiveTab}
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
      />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "tab1" && (
          <div className="flex justify-center">
            <div className={`max-w-3xl w-full p-4`}>
              <h1 className="text-2xl font-bold mb-8">Tasks</h1>
              <ul className="space-y-1">
                {tasks
                  .filter((task) => !task.checked)
                  .map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={handleToggleTask}
                      onDelete={handleDeleteTask}
                      onEdit={handleEditTask}
                    />
                  ))}
              </ul>
              <Button
                type="button"
                variant="default"
                className="bg-blue-600 hover:bg-blue-800 mt-4 mr-4 mb-4"
                onClick={() => setIsDialogOpen(true)}
              >
                Add Task
              </Button>
              <AddTaskDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onAddTask={handleAddTask}
              />

              {tasks.some((task) => task.checked) && (
                <>
                  <hr className="my-4 border-t border-gray-300" />
                  <h1 className="text-2xl font-bold mb-8">Completed</h1>
                  <ul className="space-y-1">
                    {tasks
                      .filter((task) => task.checked)
                      .map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onToggle={handleToggleTask}
                          onDelete={handleDeleteTask}
                          onEdit={handleEditTask}
                        />
                      ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === "tab2" && (
          <div className="flex justify-center">
            <div className="max-w-6xl w-full p-4">
              <TaskCalendarGrid tasks={dailyTasks} />
              <AddTaskButton
                onClick={() => setIsDialogOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 my-4 mr-4"
              />
              <AddTaskDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onAddTask={handleAddTask}
              />
            </div>
          </div>
        )}

        {activeTab === "tab3" && <div>This is the content for Tab 3.</div>}
      </div>
    </div>
  );
}
