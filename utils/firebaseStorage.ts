import { db } from "@/utils/firebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Task } from "@/components/TaskItem";

/**
 * Load tasks from Firestore for a specific user.
 */
export async function loadTasks(userId: string): Promise<Task[]> {
  try {
    const tasksRef = collection(db, "users", userId, "tasks");
    const snapshot = await getDocs(tasksRef);
    const tasks: Task[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];

    return tasks;
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
}

/**
 * Save or update tasks in Firestore for a specific user.
 */
export async function saveTasks(userId: string, tasks: Task[]): Promise<void> {
  try {
    const batchPromises = tasks.map(async (task) => {
      const taskRef = doc(db, "users", userId, "tasks", task.id);
      await setDoc(taskRef, task, { merge: true }); // Merges if task exists
    });

    await Promise.all(batchPromises);
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
}
