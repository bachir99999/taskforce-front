export interface LoginCredentials {
    name: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    type: string; // "Bearer"
  }
  
  const BASE_URL = 'http://localhost:8080/users';

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

  export async function registerUser(credentials: LoginCredentials): Promise<LoginResponse> {
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

  export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem("authToken");
    console.log("Token:", token); // Debugging line to check the token value
    
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ?? "",
        "Content-Type": "application/json",
      },
    });
  }