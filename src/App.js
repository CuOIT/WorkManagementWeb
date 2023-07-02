import "./App.css";

import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import ChoicePopUp from "./components/ChoicePopUp";

function App() {
    return (
        <>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
            <ChoicePopUp content={"Hello world"} handleChoice={() => {}} />
        </>
    );
}
export default App;
