import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./components/ErrorPage"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    }
  ])

  return <RouterProvider router={router} />
}

export default Router
