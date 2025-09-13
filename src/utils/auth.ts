export const saveToken = (token: string, username: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
};

export const getToken = () => localStorage.getItem("token");

export const getUsername = () => localStorage.getItem("username");

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};
