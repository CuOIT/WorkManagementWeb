// import LoginForm from "@/services/Auth/Auth";

import LoginForm from "../../components/Auth/Auth";
import NotFound from "../../components/NotFound";
import HomeForm from "../../components/Home/Home";
import Homepage from "../../components/Home/HomeUser";


export const PublicRouter = [
  {
    path: "/",
    element: LoginForm,
  },
  {
    path: "*",
    element: NotFound,
  },
  {
    path: "/home",
    element: HomeForm,
  },
  {
    path: "/page",
    element: Homepage,
  },
];
