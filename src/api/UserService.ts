import axios from "axios";
import { User } from "../types/User";

const API_URL = "https://localhost:44358/api/auth";

interface RegisterPayload {
  Username: string;
  PasswordHash: string;
}

export const registerUser = async (data: RegisterPayload): Promise<User> => {
  try {
    const response = await axios.post<User>(`${API_URL}/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao registrar usuário:", error.response || error.message);
    throw new Error(error.response?.data?.message || "Erro ao registrar usuário");
  }
};
