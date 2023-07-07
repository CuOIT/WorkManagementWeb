import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./index.css";
const BaseLayout = ({ children }) => {
    return (
        <div className="base_layout">
            <Navbar />
            <div className="body_page" style={{ display: "flex", flexDirection: "row", width: "100vw", height: "100vh" }}>
                <Sidebar />
                <div className="main_content">{children}</div>
            </div>
        </div>
    );
};

export default BaseLayout;
