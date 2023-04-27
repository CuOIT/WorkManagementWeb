// import LoginForm from "@/services/Auth/Auth";

import LoginForm from "../../components/Auth/Auth";
import NotFound from "../../components/NotFound";
export const PublicRouter = [
  {
    path: "/",
    element: LoginForm,
  },
  {
    path: "*",
    element: NotFound,
  },
];
