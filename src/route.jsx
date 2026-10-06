import { createBrowserRouter, Link, redirect } from "react-router";

import Home from "./pages/Home";
import Budgeting from "./pages/Budgeting";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import UserLayout from "./Layouts/UserLayout";
import AuthLayout from "./Layouts/AuthLayout";
import { getMeService } from './api/auth.api';


const checkIsLogin = async () => {
    const user = await getMeService();

    if (!user) {
        throw redirect("/login");
    }

    return null;
};

const checkRoot = async () => {
    const user = await getMeService();

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
                        title: "خانه",
                        // breadcrumb: (match) => <Link to={match.pathname}>خانه</Link>,
                    }
                },
                {
                    path: "budget",
                    Component: Budgeting,
                    handle: {
                        title: "بودجه‌بندی",
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