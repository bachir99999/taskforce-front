export type TaskStatus = "TODO" | "En cours" | "Terminé";

export interface Task {
  id: number;
  name: string;
  status: TaskStatus;
  dueDate: Date;
  description?: string;
}


export interface TaskDTO {
  name: string;
  status: TaskStatus;
  dueDate: Date;
  description?: string;
}
