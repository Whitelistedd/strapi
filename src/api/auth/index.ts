import { api } from "@/lib/axios";

export const authApi = {
  register: (username: string, email: string, password: string) => {
    return api.post("/auth/local/register", {
      username,
      email,
      password,
    });
  },
  login: (email: string, password: string) => {
    return api.post("/auth/local/login", { email, password });
  },
};
