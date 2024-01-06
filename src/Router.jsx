import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./components/ErrorPage"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Comments from "./components/Comments"
import NewBlog from "./components/NewBlog"

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
    },
    {
      path: "/dashboard/:blogid/comments",
      element: <Comments />
    },
    {
      path: "/newblog",
      element: <NewBlog />
    }
  ])

  return <RouterProvider router={router} />
}

export default Router
