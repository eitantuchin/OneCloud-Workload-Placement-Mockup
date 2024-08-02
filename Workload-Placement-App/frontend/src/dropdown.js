import { questionHistExp } from "./question_page";
import React from "react";

var isInitialScreen;
var selectedKey;

function Dropdown() {
    return (
        <select
            value="Select Page"
            style={{ padding: "10px", marginLeft: "20px", width: "150px" }}
            onChange={(e) => {
                const selectedKey = e.target.value;
                if (selectedKey === "VSAD Select") {
                 //   setIsInitialScreen(true);
                } else {
                   // setCurrentQuestionKey(selectedKey);
                }
            }}
        >
            <option value="Select Page" disabled>Select Page</option>
            {questionHistExp.map((key) => (
                <option key={key} value={key}>
                    {key}
                </option>
            ))}
        </select>
    )
}

export default Dropdown;