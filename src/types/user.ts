import { Task } from "./task"; 

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  taskList: Task[];
}

export interface UserResponse {
    id: number;
    name: string;
    email: string;
  }