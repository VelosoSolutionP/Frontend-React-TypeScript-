import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TaskForm from "./TaskForm";
import { Task } from "../types/Task";
import { User } from "../types/User";

type TaskModalProps = {
  open: boolean;
  onClose: () => void;
  task?: Task;
  user: User;
  onSaved: () => void;
};

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, task, user, onSaved }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {task ? "Editar Tarefa" : "Nova Tarefa"}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TaskForm task={task} user={user} onSaved={onSaved} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
