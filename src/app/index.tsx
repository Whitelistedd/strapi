import { RouterProvider } from "react-router-dom";

import { createRouter } from "./pages";

const AppRouter = () => {
  const router = createRouter();

  return <RouterProvider router={router} />;
};

function App() {
  return <AppRouter />;
}

export default App;
