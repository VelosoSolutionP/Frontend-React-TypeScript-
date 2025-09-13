export interface User {
  id: number;
  username: string;
  passwordHash?: string;
  createdAt?: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  category?: string;
  isCompleted?: boolean;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskCreateDto {
  title: string;
  description?: string;
  category?: string;
  userId?: number; 
}

export interface TaskUpdateDto {
  title?: string;
  description?: string;
  category?: string;
  isCompleted?: boolean;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
}

export interface JwtPayload {
  sub: string;
  username: string;
  exp: number;
  iat: number;
}