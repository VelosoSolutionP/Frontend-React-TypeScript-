// src/pages/Register.tsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Link,
  Box,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/UserService";
import { User } from "../types/User";

interface RegisterProps {
  onRegister: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setError("");
      if (!username || !password) {
        setError("Preencha todos os campos!");
        return;
      }

      const newUser = await registerUser({ Username: username, PasswordHash: password });
      onRegister(newUser);
      navigate("/dashboard");
    } catch {
      setError("Erro ao registrar usuário!");
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Registrar Usuário
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Senha"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={handleRegister}
        >
          Registrar
        </Button>

        <Box textAlign="center">
          <Typography variant="body2">
            Já possui conta?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/login")}
            >
              Entrar
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;