import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/AuthService";
import { User } from "../types/User";

interface LoginProps { onLogin: (user: User) => void }

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");
      const user = await loginUser({ Username: username, PasswordHash: passwordHash });
      onLogin(user);
      navigate("/dashboard");
    } catch {
      setError("Usuário ou senha inválidos!");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f4f6f8">
      <Paper elevation={6} sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Typography variant="h5" textAlign="center" mb={2} fontWeight="bold">Login</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField fullWidth label="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="Senha"
          type={showPassword ? "text" : "password"}
          value={passwordHash}
          onChange={(e) => setPasswordHash(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button fullWidth variant="contained" color="primary" onClick={handleLogin} sx={{ mb: 2, py: 1.2, fontWeight: "bold" }}>Entrar</Button>
        <Typography textAlign="center" variant="body2">
          Não tem conta? <Link to="/register">Registre-se</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;