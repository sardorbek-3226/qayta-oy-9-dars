import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalContext";

function App() {
  const {user} = useContext(GlobalContext);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />,
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Singup />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
