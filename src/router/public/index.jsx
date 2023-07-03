// import LoginForm from "@/services/Auth/Auth";

import LoginForm from "../../components/Auth";
import NotFound from "../../components/NotFound";
import BaseLayout from "../../layout/Base";
import Today from "../../components/today/Today";

export const PublicRouter = [
    {
        path: "/login",
        element: LoginForm,
    },
    {
        path: "/*",
        element: Today,
        layout: BaseLayout,
    },
    // {
    //     path: "/today",
    //     element: Today,
    //     layout: BaseLayout,
    // },
];
