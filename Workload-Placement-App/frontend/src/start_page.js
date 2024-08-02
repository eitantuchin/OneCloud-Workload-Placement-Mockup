import React, { useState } from "react";
import QuestionView from "./question_page";
import { responseDatabase } from "./index"; // Import the database

var inputValueExp;

function InitialScreen() {
    // State variables for the first input
    const [inputValue1, setInputValue1] = useState("");
    const [isButtonEnabled1, setIsButtonEnabled1] = useState(false);
    const [errorMessage1, setErrorMessage1] = useState("");
    const [isButtonClicked1, setIsButtonClicked1] = useState(false);

    // State variables for the second input
    const [inputValue2, setInputValue2] = useState("");
    const [isButtonEnabled2, setIsButtonEnabled2] = useState(false);
    const [errorMessage2, setErrorMessage2] = useState("");
    const [responses, setResponses] = useState([]); // State to store fetched responses

    const handleInputChange1 = (e) => {
        const value = e.target.value;
        setInputValue1(value);

        if (value.length === 4) {
            setIsButtonEnabled1(true);
            setErrorMessage1("");
        } 
        else if (value.length === 0) {
            setErrorMessage1("");
        }
        else {
            setIsButtonEnabled1(false);
            setErrorMessage1("Please Enter a Valid VSAD");
        }
    };

    const handleInputChange2 = (e) => {
        const value = e.target.value;
        setInputValue2(value);

        if (value.length === 4) {
            setIsButtonEnabled2(true);
            setErrorMessage2("");
        }
        else if (value.length === 0) {
            setErrorMessage2("");
            setResponses([]); // Clear responses if input is empty
        }
         else {
            setIsButtonEnabled2(false);
            setErrorMessage2("Please Enter a Valid VSAD");
            setResponses([]); // Clear responses if input is invalid
        }
    };

    const handleButtonClick1 = () => {
        setIsButtonClicked1(true);
    };

    const handleButtonClick2 = async () => {
        if (isButtonEnabled2) {
            try {
                const query = responseDatabase.responses
                    .find({
                        selector: {
                            VSAD: inputValue2
                        }
                    });

                const result = await query.exec();
                setResponses(result.map(doc => doc.toJSON()));
            } catch (error) {
                console.error("Error fetching responses by VSAD:", error);
            }
        }
    };

    inputValueExp = inputValue1;

    return (
        <div>
            {!isButtonClicked1 ? (
                <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                    <h2>Workload Placement</h2>
                    <hr />
                    <h3>New Response</h3>
                    <input
                        type="text"
                        placeholder="Enter Your 4-digit VSAD"
                        value={inputValue1}
                        onChange={handleInputChange1}
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
                        disabled={!isButtonEnabled1}
                        onClick={handleButtonClick1}
                        style={{
                            backgroundColor: isButtonEnabled1 ? "#d52b1e" : "gray",
                            color: "white",
                            cursor: isButtonEnabled1 ? "pointer" : "not-allowed",
                            padding: "10px 20px",
                            fontFamily: "Arial, sans-serif",
                            border: "none",
                            borderRadius: "4px"
                        }}
                    >
                        Determine Workload Placement
                    </button>
                    {errorMessage1 && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage1}</p>}
                    <h3>Show Response(s) By VSAD</h3>
                    <input
                        type="text"
                        placeholder="Enter Your 4-digit VSAD"
                        value={inputValue2}
                        onChange={handleInputChange2}
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
                        disabled={!isButtonEnabled2}
                        onClick={handleButtonClick2}
                        style={{
                            backgroundColor: isButtonEnabled2 ? "#d52b1e" : "gray",
                            color: "white",
                            cursor: isButtonEnabled2 ? "pointer" : "not-allowed",
                            padding: "10px 20px",
                            fontFamily: "Arial, sans-serif",
                            border: "none",
                            borderRadius: "4px"
                        }}
                    >
                        View Responses
                    </button>
                    {errorMessage2 && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage2}</p>}
                    {responses.length > 0 && (
                        <div style={{ marginTop: "20px" }}>
                            <h4>Responses for VSAD {inputValue2}:</h4>
                            <ul>
                                {responses.map(response => (
                                    <li key={response.id}>
                                        <p><strong>VZID:</strong> {response.VZID}</p>
                                        <p><strong>Responses:</strong> {response.RESPONSES}</p>
                                        <p><strong>Recommendation:</strong> {response.REC}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <QuestionView />
            )}
        </div>
    );
}

export { inputValueExp };
export default InitialScreen;
