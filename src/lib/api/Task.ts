import { format } from "date-fns";
import { Task } from "../../types/task";
import { fetchWithAuth } from "./auth";

const BASE_URL = 'http://localhost:8080/tasks';

// Obtenir toutes les tâches
export async function getAllTasks(): Promise<Task[]> {
  const res = await fetchWithAuth(BASE_URL, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Erreur lors du chargement des tâches');
  const rawTasks = await res.json();

  return rawTasks.map(transformTask);
}


// Obtenir une tâche par ID
export async function getTaskById(id: number): Promise<Task> {
  const res = await fetchWithAuth(`${BASE_URL}/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Erreur lors du chargement de la tâche ${id}`);
  const rawTasks = await res.json();

  return rawTasks.map(transformTask);

}

// Créer une tâche
export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
  const payload = {
    ...task,
    dueDate: toIsoDateString(task.dueDate),
    assignedToId: 1,
  };

  const res = await fetchWithAuth(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error(await res.text()); // déboguage
    throw new Error('Erreur lors de la création de la tâche');
  }

  const rawTask = await res.json();
  return transformTask(rawTask);
}


// Mettre à jour une tâche (PUT complet)
export async function updateTask(id: number, task: Omit<Task, 'id'>): Promise<Task> {
  const payload = {
    ...task,
    dueDate: toIsoDateString(task.dueDate),
    assignedToId: 1,
  };
  
  const res = await fetchWithAuth(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Erreur lors de la mise à jour de la tâche ${id}`);
  return res.json();
}

//PATCH
export async function patchTask(id: number, partialTask: Partial<Task>): Promise<Task> {
  const res = await fetchWithAuth(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partialTask),
  });

  if (!res.ok) throw new Error(`Erreur lors du patch de la tâche ${id}`);
  return res.json();
}

// Supprimer une tâche
export async function deleteTask(id: number): Promise<void> {
  console.log(`Suppression de la tâche avec l'ID ${id}`);
  
  const res = await fetchWithAuth(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error(`Erreur lors de la suppression de la tâche ${id}`);
}


function transformTask(raw: any): Task {
  return {
    id: raw.id,
    name: raw.name, 
    status: raw.status,
    dueDate: new Date(raw.dueDate),
    description: raw.description,
  };
}

function toIsoDateString(date: Date): string {
  return format(date, "yyyy-MM-dd");
}
