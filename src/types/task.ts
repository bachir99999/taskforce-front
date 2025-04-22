export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

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
