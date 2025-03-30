export type TaskStatus = "TODO" | "En cours" | "Terminé";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  date: Date;
  description?: string;
}
