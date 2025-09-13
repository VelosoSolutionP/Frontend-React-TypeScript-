export interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: any | null;  
}