// when the "Get Recommendation" button is clicked the responseMap should be fed to the AI as part of the system message
import React from "react";
import { responseMap } from "./question_page";

function ResponsesView({ goBack, canGetRecommendation }) {  // Receive goBack and canGetRecommendation as props
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2>Workload Placement</h2>
            <hr />
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ marginRight: "20px" }}>Review Your Responses</h3>
                {canGetRecommendation ? (
                    <button
                        style={{
                            backgroundColor: "#1e90ff",
                            color: "white",
                            border: "none",
                            padding: "10px",
                            marginLeft: "10px",
                            cursor: "pointer",
                            borderRadius: "4px",
                            fontFamily: "Arial, sans-serif"
                        }}
                        onClick={() => console.log(responseMap)}  // Placeholder for recommendation logic
                    >
                        <b>GET RECOMMENDATION</b>
                    </button>
                ) : (
                    <p style={{ color: "red", marginLeft: "10px" }}>
                        Please finish answering all necessary questions to get your recommendation.
                    </p>
                )}
                <button
                    style={{
                        backgroundColor: "#d52b1e",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        marginLeft: "auto", // Aligns the button to the right
                        cursor: "pointer",
                        borderRadius: "4px",
                        fontFamily: "Arial, sans-serif"
                    }}
                    onClick={goBack}  // Use goBack function to go back to the previous page
                >
                    <b>Back</b>
                </button>
               
            </div>
            <div style={{ marginTop: "20px" }}>
                {Object.entries(responseMap).map(([question, answer]) => (
                    <div key={question} style={{ marginBottom: "20px" }}>
                        <h4 style={{ marginRight: "20px" }}>{question}</h4>
                        {Array.isArray(answer) ? (
                            <ul style={{ paddingLeft: "20px" }}>
                                {answer.map((ans, index) => (
                                    <li key={index} style={{ marginBottom: "10px" }}>
                                        <p>{ans}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>{answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResponsesView;
