import axios from "axios";
import { User } from "../types/User";

const API_URL = "https://localhost:44358/api/auth";

interface LoginPayload {
  Username: string;
  PasswordHash: string;
}

export const loginUser = async (data: LoginPayload): Promise<User> => {
  try {
    const response = await axios.post<User>(`${API_URL}/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao logar usuário:", error.response || error.message);
    throw new Error(error.response?.data?.message || "Erro ao logar usuário");
  }
};
