import React from "react";
import "./index.css";
const ChoicePopUp = ({ content, handleChoice }) => {
    const handleYesOrNo = (choice) => {
        //choice is boolean
        handleChoice(choice);
        console.log(choice);
    };
    return (
        <div className="pop-up-panel">
            <div className="pop-up-container">
                <div className="pop-up-content">{content}</div>
                <div className="choice-field">
                    <div className="choice-btn">
                        <button onClick={() => handleYesOrNo(true)}>Yes</button>
                    </div>
                    <div className="choice-btn">
                        <button onClick={() => handleYesOrNo(false)}>No</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoicePopUp;
