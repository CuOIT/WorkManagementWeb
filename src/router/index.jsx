// import BaseLayout from "@/layout/Base";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { PublicRouter } from "./public";
import { PrivateRouter } from "./private";

import EmptyLayout from "../layout/Empty";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../redux/reducer/userReducer";

const Router = () => {
    const accessToken = useSelector(selectAccessToken)
    const navigate = useNavigate();
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
                {!accessToken ? 
                (PublicRouter.map((route, index) => {
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
                })) :
                (PrivateRouter.map((route, index) => {
                    //handleLogic accessToken
                    if (false) {
                        navigate("/login");
                    }
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
                }))
            }
            </Routes>
        </>
    );
};

export default Router;
