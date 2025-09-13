import React from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../types/Task";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => (
  <List>
    {tasks.map((task) => (
      <ListItem key={task.id} secondaryAction={
        <IconButton edge="end" onClick={() => onDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
      }>
        <ListItemText
          primary={task.title}
          secondary={`Categoria: ${task.category}`}
        />
      </ListItem>
    ))}
  </List>
);

export default TaskList;