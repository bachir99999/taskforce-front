import { UserResponse } from "../../types/user"; 

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