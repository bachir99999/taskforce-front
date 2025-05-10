import { Task } from "../../types/task";
import { UserResponse } from "../../types/user"; 
import { fetchWithAuth } from "./authAPI";
import { transformTask } from "./taskAPI";

const BASE_URL = 'http://localhost:8080/users';

export async function getUserByUsername(username: string): Promise<UserResponse> {
  const response = await fetch(`${BASE_URL}/name/${encodeURIComponent(username)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération de l'utilisateur : ${response.status}`);
  }

  const user: UserResponse = await response.json();
  return user;
}

// Cette fonction est utilisée pour obtenir un utilisateur spécifique en utilisant son ID.
export async function getAllTasksOfUser(userId : number): Promise<Task[]> {
  const res = await fetchWithAuth(`${BASE_URL}/${userId}/tasks`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Erreur lors du chargement des tâches');
  const rawTasks = await res.json();
  console.log(res);
  return rawTasks.map(transformTask);
}
