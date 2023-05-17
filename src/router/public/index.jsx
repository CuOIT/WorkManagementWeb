// import LoginForm from "@/services/Auth/Auth";

import LoginForm from "../../components/Auth/Auth";
import NotFound from "../../components/NotFound";
import HomePage from "../../components/Home_page/index"

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
    path:"/trangchu/*",
    element:HomePage,
  },
  // {
  //   path:"/trangchu/today/*",
  //   element:HomePage,
  // },
  // {
  //   path:"/trangchu/plan/*",
  //   element:HomePage,
  // },
  // {
  //   path:"/trangchu/assignment/*",
  //   element:HomePage,
  // },
  // {
  //   path:"/trangchu/project/*",
  //   element:HomePage,
  // }
];
