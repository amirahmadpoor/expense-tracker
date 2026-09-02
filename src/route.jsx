import { createBrowserRouter, redirect } from "react-router";

import Home from "./pages/Home";
import Budgeting from "./pages/Budgeting";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import UserLayout from "./Layouts/UserLayout";
import AuthLayout from "./Layouts/AuthLayout";

import { supabase } from "./lib/supabase";


const checkIsLogin = async () => {
    const {
        data: { user },
        error
    } = await supabase.auth.getUser();

    if (error || !user) {
        throw redirect("/login");
    }

    return null;
};


const router = createBrowserRouter([
    {
        Component: UserLayout,
        loader: checkIsLogin,

        children: [
            {
                path: 'tracker',
                Component: Home
            },
            {
                path: "budget",
                Component: Budgeting
            },
        ],
    },

    {
        Component: AuthLayout,
        children: [
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            },
        ],
    },

    {
        path: "*",
        Component: NotFound
    },

],
    {
        basename: "/expense-tracker"
    }
);

export default router;