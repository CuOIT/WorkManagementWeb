// import BaseLayout from "@/layout/Base";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { PublicRouter } from "./public";
import { PrivateRouter } from "./private";

import EmptyLayout from "../layout/Empty";
import ChoicePopUp from "../components/ChoicePopUp";

const Router = () => {
    const user = JSON.parse(localStorage.getItem("user"));
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
                {PublicRouter.map((route, index) => {
                    const Container = route.element;
                    const Layout = checkLayout(route);
                    return (
                        <Route
                            exact
                            path={route.path}
                            key={index}
                            element={
                                <Layout>
                                    <Suspense fallback={<>Loading...</>}>
                                        <>
                                            <Container />
                                        </>
                                    </Suspense>
                                </Layout>
                            }
                        />
                    );
                })}
                {PrivateRouter.map((route, index) => {
                    //handleLogic accessToken
                    const Container = route.element;
                    const Layout = checkLayout(route);

                    return (
                        <Route
                            path={route.path}
                            key={index}
                            element={
                                <Layout>
                                    <Suspense fallback={<>Loading...</>}>
                                        <>
                                            <Container />
                                            {!user && (
                                                <ChoicePopUp
                                                    content={"Login to use this feature!"}
                                                    handleChoice={(choice) => {
                                                        if (choice) {
                                                            navigate("/login");
                                                        } else {
                                                            navigate("/");
                                                        }
                                                    }}
                                                />
                                            )}
                                        </>
                                    </Suspense>
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </>
    );
};

export default Router;
