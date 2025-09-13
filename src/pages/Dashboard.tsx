import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import TaskModal from "../components/TaskModal";
import { Task } from "../types/Task";
import TaskService from "../api/TaskService";
import { User } from "../types/User";

type DashboardProps = {
  user: User;
  onLogout: () => void;
};

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  const fetchTasks = async () => {
    try {
      const data = await TaskService.getByUserId(user.id);
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar tarefas", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpenModal = (task?: Task) => {
    setTaskToEdit(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTaskToEdit(undefined);
  };

  const handleSaveTask = async (taskData?: Partial<Task>) => {
    await fetchTasks();
    handleCloseModal();
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await TaskService.delete(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Erro ao deletar tarefa", err);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updated = await TaskService.update(task.id, {
        ...task,
        isCompleted: !task.isCompleted,
      });
      if (!updated) return;
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
    }
  };

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />

      <Button
        variant="contained"
        color="primary"
        sx={{ m: 2 }}
        onClick={() => handleOpenModal()}
      >
        Nova Tarefa
      </Button>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          p: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        {tasks.map((task) => (
          <Card
            key={task.id}
            sx={{
              bgcolor: task.isCompleted ? "#e0f7fa" : "white",
              p: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {task.description}
              </Typography>
              <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
                Categoria: {task.category || "-"}
              </Typography>

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  onClick={() => handleToggleComplete(task)}
                >
                  {task.isCompleted ? "Reabrir" : "Concluir"}
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleOpenModal(task)}
                >
                  Editar
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Deletar
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <TaskModal
        open={modalOpen}
        onClose={handleCloseModal}
        task={taskToEdit}
        user={user}
        onSaved={handleSaveTask}
      />
    </>
  );
};

export default Dashboard;