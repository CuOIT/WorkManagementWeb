import Project from "../../components/MyProject";
import Workspace from "../../components/Workspace";
import TodoList from "../../components/today/TodayUser";
import Work from "../../components/Work";
import BaseLayout from "../../layout/Base";

export const PrivateRouter = [
    {
        path: "/today",
        element: TodoList,
        layout: BaseLayout,
    },
    {
        path: "workspace",
        element: Workspace,
        layout: BaseLayout,
    },
    {
        path: "workspace/:workspace_id",
        element: Work,
        layout: BaseLayout,
    },
    {
        path: "project/:project_id",
        element: Project,
        layout: BaseLayout,
    },
    {
        path: "/",
        element: TodoList,
        layout: BaseLayout,
    }
];
