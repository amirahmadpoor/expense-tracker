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

const checkRoot = async () => {
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (user) {
        throw redirect("/tracker");
    }

    throw redirect("/login");
};

const router = createBrowserRouter(
    [
        {
            path: "/",
            loader: checkRoot,
        },

        {
            Component: UserLayout,
            loader: checkIsLogin,

            children: [
                {
                    path: "tracker",
                    Component: Home,
                    handle: {
                        title: "خانه"
                    }
                },
                {
                    path: "budget",
                    Component: Budgeting,
                    handle: {
                        title: "بودجه‌بندی"
                    }
                },
            ],
        },

        {
            Component: AuthLayout,

            children: [
                {
                    path: "login",
                    Component: Login,
                    handle: {
                        title: "ورود"
                    }
                },
                {
                    path: "register",
                    Component: Register,
                    handle: {
                        title: "ثبت‌نام"
                    }
                },
            ],
        },

        {
            path: "*",
            Component: NotFound,
            handle: {
                title: "صفحه پیدا نشد"
            }
        },
    ],

    {
        basename: "/expense-tracker"
    }
);

export default router;