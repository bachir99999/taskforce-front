import { UserResponse } from "../../types/user";

export interface LoginCredentials {
    name: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    type: string; // "Bearer"
  }

  export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
  }
  
  const BASE_URL = 'http://localhost:8080/auth';

  export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur lors de la connexion.");
    }
  
    return await response.json();
  }

  export async function verifyToken(token: string): Promise<Boolean> {
    const response = await fetch(`${BASE_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur lors de la vérification du token.");
    }

    return await response.json();
  }

  export async function registerUser(credentials: RegisterCredentials): Promise<UserResponse> {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur lors de l'inscription.");
    }
  
    return await response.json();
  }

  export const verifSavedToken = async (token: string | null, logout: () => void) => {
    if (!token) {
      console.log("Aucun token trouvé.");
      logout();
      return false;
    }
  
    try {
      const response = await verifyToken(token.substring(7));
      console.log("Token vérifié:", response);
  
      if (!response) {
        logout();
        return false;
      }
  
      return true;
    
    } catch (error) {
      logout();
      console.error("Erreur lors de la vérification du token :", error);
      return false;
    }
  };


  export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem("authToken");

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ?? "",
        "Content-Type": "application/json",
      },
    });
  }

