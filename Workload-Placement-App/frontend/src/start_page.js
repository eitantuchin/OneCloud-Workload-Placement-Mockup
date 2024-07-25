import React, { useState } from "react";
import QuestionView from "./question_page";

function InitialScreen() {
    const [inputValue, setInputValue] = useState("");
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value === "1234") {
            setIsButtonEnabled(true);
            setErrorMessage("");
        } else {
            setIsButtonEnabled(false);
            setErrorMessage("Please Enter a Valid VSAD");
        }
    };

    const handleButtonClick = () => {
        setIsButtonClicked(true);
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            {!isButtonClicked ? (
                <div>
                    <h2>Workload Placement</h2>
                    <hr />
                    <input
                        type="text"
                        placeholder="Enter Your 4-digit VSAD"
                        value={inputValue}
                        onChange={handleInputChange}
                        style={{
                            marginRight: "10px",
                            padding: "10px",
                            fontFamily: "Arial, sans-serif",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            width: "200px"
                        }}
                    />
                    <button
                        disabled={!isButtonEnabled}
                        onClick={handleButtonClick}
                        style={{
                            backgroundColor: isButtonEnabled ? "#d52b1e" : "gray",
                            color: "white",
                            cursor: isButtonEnabled ? "pointer" : "not-allowed",
                            padding: "10px 20px",
                            fontFamily: "Arial, sans-serif",
                            border: "none",
                            borderRadius: "4px"
                        }}
                    >
                        Determine Workload Placement
                    </button>
                    {errorMessage && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>}
                </div>
            ) : (
                <QuestionView />
            )}
        </div>
    );
}

export default InitialScreen;
