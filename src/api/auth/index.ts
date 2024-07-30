import { getToken } from "@/helpers/tokens";
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
  fetchUser: () => {
    const token = getToken();
    return api.get("/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
