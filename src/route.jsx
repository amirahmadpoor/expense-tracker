import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Budgeting from "./pages/Budgeting";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import UserLayout from "./Layouts/UserLayout";
import AuthLayout from "./Layouts/AuthLayout";

const router = createBrowserRouter([
    {
        path: "expense-tracker",
        Component: UserLayout,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "budget",
                element: < Budgeting />
            },
        ],
    },

    {
        Component: AuthLayout,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
        ],
    },

    {
        path: "/*",
        element: <NotFound />
    },
]);

export default router;