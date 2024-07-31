import { ProtectedRoute } from "@/components/protectedRoute/auth";
import { createBrowserRouter, Outlet } from "react-router-dom";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { MainRoute } = await import("./main");
        return { Component: MainRoute };
      },
    },
    {
      path: "/register",
      lazy: async () => {
        const { RegisterRouter } = await import("./auth/register");
        return { Component: RegisterRouter };
      },
    },
    {
      path: "/login",
      lazy: async () => {
        const { LoginRoute } = await import("./auth/login");
        return { Component: LoginRoute };
      },
    },
    {
      path: "/cart",
      element: (
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          lazy: async () => {
            const { CartRoute } = await import("./cart");
            return { Component: CartRoute };
          },
        },
      ],
    },
  ]);
