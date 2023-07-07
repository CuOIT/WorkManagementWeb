// import LoginForm from "@/services/Auth/Auth";

import LoginForm from "../../components/Auth";
import BaseLayout from "../../layout/Base";
import TodoList from "../../components/today/TodayUser";
import MyProject from "../../components/MyProject";

export const PublicRouter = [
    {
        path: "/login",
        element: LoginForm,
    },
    {
        path: "/",
        element: TodoList,
        layout: BaseLayout,
    },
    {
        path: "/today",
        element: TodoList,
        layout: BaseLayout,
    },
];
