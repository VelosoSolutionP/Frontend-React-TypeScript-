import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Checkbox, FormControlLabel } from "@mui/material";
import { Task } from "../types/Task";
import TaskService from "../api/TaskService";
import { User } from "../types/User";

type TaskFormProps = {
  task?: Task;
  user: User;
  onSaved: () => void;
  onClose: () => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ task, user, onSaved, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setCategory(task.category || "");
      setIsCompleted(task.isCompleted || false);
    } else {
      setTitle("");
      setDescription("");
      setCategory("");
      setIsCompleted(false);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const taskData: Partial<Task> = {
        id: task?.id,
        title,
        description,
        category,
        isCompleted,
      };

      if (task?.id) {
        await TaskService.update(task.id, taskData);
      } else {
        await TaskService.create(taskData, user.id);
      }

      onSaved();
      onClose();
    } catch (err) {
      console.error("Erro ao salvar tarefa:", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        width: "500px", // largura adequada
        maxWidth: "100%",
      }}
    >
      <TextField
        fullWidth
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Descrição"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
        }
        label="Concluída"
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;