import { Task } from "../../types/task";
import { UserDTO, UserResponse } from "../../types/user"; 
import { fetchWithAuth } from "./authAPI";
import { transformTask } from "./taskAPI";

const BASE_URL = 'http://localhost:8080/users';


// Cette fonction est utilisée pour obtenir un utilisateur spécifique en utilisant son ID.
export async function getAllTasksOfUser(userId : number): Promise<Task[]> {
  const res = await fetchWithAuth(`${BASE_URL}/${userId}/tasks`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Erreur lors du chargement des tâches');
  const rawTasks = await res.json();
  return rawTasks.map(transformTask);
}


export async function updateUser(id : number, user: UserDTO): Promise<UserResponse> {
  const payload = {
    ...user,
  };

  const res = await fetchWithAuth(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
  const rawUser = await res.json();

  return rawUser;
}

