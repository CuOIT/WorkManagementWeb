// import BaseLayout from "@/layout/Base";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes,  } from "react-router-dom";
import { PublicRouter } from "./public";
import EmptyLayout from "../layout/Empty";

const Router = () => {
  const checkLayout = (route) => {
    let Layout = EmptyLayout;
    if (route.layout) {
      Layout = route.layout;
    } else if (route.layout === null) {
      Layout = EmptyLayout;
    }
    return Layout;
  };



  return (
    <>
      <Routes>
        {PublicRouter.map((route, index) => {
            const Container = route.element;
            const Layout = checkLayout(route);
            return (
              <Route
                path={route.path}
                key={index}
                element={
                  <Layout>
                    <Suspense fallback={<>Loading...</>}>
                      <Container />
                    </Suspense>
                  </Layout>
                }
              />
            );
          })
          
          }
      </Routes>
    </>
  );
};

export default Router;
