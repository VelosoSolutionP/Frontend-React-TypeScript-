import axios from "axios";
import { Task } from "../types/Task";

const API_URL = "https://localhost:44358/api"; 

const TaskService = {
  getByUserId: async (userId: number): Promise<Task[]> => {
    const response = await axios.get<Task[]>(`${API_URL}/Tasks`, {
      params: { userId },
    });
    return response.data;
  },

  getById: async (id: number): Promise<Task> => {
    const response = await axios.get<Task>(`${API_URL}/Tasks/${id}`);
    return response.data;
  },

  create: async (task: Partial<Task>, userId: number): Promise<Task> => {
    const response = await axios.post<Task>(`${API_URL}/Tasks`, {
      ...task,
      userId,
    });
    return response.data;
  },

  update: async (id: number, task: Partial<Task>): Promise<Task> => {
    const response = await axios.put<Task>(`${API_URL}/Tasks/${id}`, task);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/Tasks/${id}`);
  },
};

export default TaskService;