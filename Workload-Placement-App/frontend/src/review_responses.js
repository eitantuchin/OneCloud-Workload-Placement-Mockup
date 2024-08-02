import React, { useState } from "react";
import { responseMapWrapper } from "./question_page";
import RecommendationView from "./recommendation";
import { responseDatabase } from "./index";
import { inputValueExp } from "./start_page";

var recommendation;

// Function to generate a random 20-character string
const generateRandomId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

// Function to ensure the ID is unique
const getUniqueId = async () => {
    let id;
    let unique = false;
    while (!unique) {
        id = generateRandomId();
        const existing = await responseDatabase.responses.findOne({ selector: { id } }).exec();
        if (!existing) {
            unique = true;
        }
    }
    return id;
};

function ResponsesView({ goBack, canGetRecommendation }) {
    const [showRecommendation, setShowRecommendation] = useState(false);
    const [loading, setLoading] = useState(false); // State to manage loading

    const handleRecommendationClick = async () => {
        setLoading(true); // Set loading to true when the function starts
        try {
            const uniqueId = await getUniqueId(); // Get a unique ID
            const responseMap = responseMapWrapper.map;

            const response = await fetch('http://127.0.0.1:5000/submit-responses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(responseMap),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            recommendation = result['AI Recommendation'];
            console.log('Unique id: ' + uniqueId)
            await responseDatabase.responses.insert({
                id: uniqueId,
                VZID: "tuchiei",
                VSAD: inputValueExp,
                RESPONSES: JSON.stringify(responseMap),
                REC: recommendation
            });

            setShowRecommendation(true);
        } catch (error) {
            console.error('Error sending data:', error);
        } finally {
            setLoading(false); // Set loading to false when the function ends
        }
    };

    if (showRecommendation) {
        return <RecommendationView />;
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2>Workload Placement</h2>
            <hr />
            <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
                <h3 style={{ marginRight: "30px" }}>Review Your Responses</h3>
                {canGetRecommendation ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <button
                            style={{
                                backgroundColor: loading ? "gray" : "#d52b1e", // Change color when loading
                                color: "white",
                                border: "none",
                                padding: "10px",
                                marginLeft: "10px",
                                cursor: loading ? "not-allowed" : "pointer", // Change cursor when loading
                                borderRadius: "4px",
                                fontFamily: "Arial, sans-serif"
                            }}
                            onClick={handleRecommendationClick}
                            disabled={loading} // Disable button when loading
                        >
                            GET RECOMMENDATION
                        </button>
                        {loading ? (<p style={{ marginLeft: "10px" }}>Loading...</p>) : 
                            (<p style={{ marginLeft: "10px", color: "red" }}>Warning: Once you click this button you will have to restart again!</p>
                        )}
                    </div>
                ) : (
                    <p style={{ color: "red", marginLeft: "10px" }}>
                        Please finish answering all necessary questions to get recommendation.
                    </p>
                )}
                <button
                    style={{
                        backgroundColor: "#d52b1e",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        marginLeft: "auto",
                        cursor: "pointer",
                        borderRadius: "4px",
                        fontFamily: "Arial, sans-serif"
                    }}
                    onClick={goBack}
                >
                    <b>Back</b>
                </button>
            </div>
            <div style={{ marginTop: "20px" }}>
                {Object.entries(responseMapWrapper.map).map(([question, answer]) => (
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

export { recommendation };
export default ResponsesView;
