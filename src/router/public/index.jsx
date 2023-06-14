// import LoginForm from "@/services/Auth/Auth";

import LoginForm from "../../components/Auth/Auth";
import NotFound from "../../components/NotFound";
import HomePage from "../../components/Home_page/index";

export const PublicRouter = [
    {
        path: "/login",
        element: LoginForm,
    },
    {
        path: "/*",
        element: HomePage,
    },
    // {
    //     path: "/trangchu/*",
    //     element: HomePage,
    // },
];
