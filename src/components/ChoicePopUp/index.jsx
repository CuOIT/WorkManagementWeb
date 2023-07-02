import React from "react";
import "./index.css";
const ChoicePopUp = ({ content, handleChoice }) => {
    return (
        <div className="pop-up-panel">
            <div className="pop-up-container">
                <div className="pop-up-content">{content}</div>
                <div className="choice-field">
                    <div className="choice-btn">
                        <button>Yes</button>
                    </div>
                    <div className="choice-btn">
                        <button>No</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoicePopUp;
