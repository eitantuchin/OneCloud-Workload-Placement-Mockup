import React, { useEffect, useState } from "react";
import decisionTree from "./decision_tree"; // Assuming the decision tree is exported from another file
import InitialScreen from "./start_page"; // Assuming this is the initial screen component
import ResponsesView from "./review_responses";
//import Dropdown from "./dropdown";
//import { initialScreen, theSelectedKey } from "./dropdown";

var selectedServiceAnswers;
let responseMap = {};
let answersExp = [];
let questionHistExp = [];


export const responseMapWrapper = {
    get map() {
        return responseMap;
    },
    reset() {
        responseMap = {};
    },
    setResponse(key, value) {
        responseMap[key] = value;
    },
    deleteResponse(key) {
        delete responseMap[key];
    }
};



function QuestionView() {
    const [isInitialScreen, setIsInitialScreen] = useState(false);
    const [currentQuestionKey, setCurrentQuestionKey] = useState("Portfolio Question");
    const [answers, setAnswers] = useState({});
    const [questionHistory, setQuestionHistory] = useState(["VSAD Select", "Portfolio Question"]);
    const [showResponsesView, setShowResponsesView] = useState(false);
    const [completedLastQuestion, setCompletedLastQuestion] = useState(false);

    const currentQuestion = decisionTree[currentQuestionKey];
    const currentAnswerArray = currentQuestion?.answer_array || [];
    const isMultiSelect = currentQuestion?.["multi-select"];
    const isTextOption = currentQuestion?.["text_option"];

    const handleAnswerChange = (answer) => {
        if (isMultiSelect) {
            setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [currentQuestionKey]: prevAnswers[currentQuestionKey]?.includes(answer)
                    ? prevAnswers[currentQuestionKey].filter((a) => a !== answer)
                    : [...(prevAnswers[currentQuestionKey] || []), answer],
            }));
        } else {
            setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [currentQuestionKey]: answer,
            }));
        }
    };

    useEffect(() => {
        Object.keys(answers).forEach((key) => {
            const questionText = decisionTree[key]?.question;
            if (questionText) {
                responseMapWrapper.setResponse(questionText, answers[key]);
            }
        });
    }, [answers]);

    useEffect(() => {
        answersExp = answers;
    }, [answers]);

    useEffect(() => {
        questionHistExp = questionHistory;
    }, [questionHistory]);

    const handleNextQuestion = () => {
        const selectedAnswers = answers[currentQuestionKey];
        let nextQuestionKey;
        if (currentQuestionKey === "Services Required") {
            selectedServiceAnswers = selectedAnswers;
            if (selectedAnswers.includes("Database")) {
                nextQuestionKey = "Database";
            } else if (selectedAnswers.includes("Standard computing")) {
                nextQuestionKey = "Standard computing";
            } else if (selectedAnswers.includes("GenAI/LLM")) {
                nextQuestionKey = "GenAI/LLM";
            } else {
                nextQuestionKey = "Other options";
            }
        } else if (currentQuestionKey === "DBA") {
            if (selectedServiceAnswers.includes("Standard computing")) {
                nextQuestionKey = "Standard computing";
            } else if (selectedServiceAnswers.includes("GenAI/LLM")) {
                nextQuestionKey = "GenAI/LLM";
            } else {
                nextQuestionKey = "Other options";
            }
        } else if (currentQuestionKey === "OS Required") {
            if (selectedServiceAnswers.includes("GenAI/LLM")) {
                nextQuestionKey = "GenAI/LLM";
            } else {
                nextQuestionKey = "Other options";
            }
        } else if (currentQuestionKey === "CPU Question" || currentQuestionKey === "Other Cloud Components"
            || (currentQuestionKey === "App Retirement" && answers["App Retirement"] === "Yes")) {
            setShowResponsesView(true);
            setCompletedLastQuestion(true);
            return;
        } else if (currentQuestionKey === "Database" && selectedAnswers.includes("MS-SQL Server")) {
            nextQuestionKey = "MS-SQL Server";
        } else if (currentQuestionKey === "Database" && !selectedAnswers.includes("MS-SQL Server")) {
            nextQuestionKey = "Other options";
        } else if (Array.isArray(selectedAnswers)) {
            nextQuestionKey = "All options";
        } else if (selectedAnswers in currentQuestion) {
            nextQuestionKey = selectedAnswers;
        } else {
            nextQuestionKey = "All options";
        }

        let nextQuestionValue = currentQuestion[nextQuestionKey]?.next;

        setQuestionHistory((prevHistory) => [...prevHistory, nextQuestionValue]);
        setCurrentQuestionKey(nextQuestionValue);
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionKey === "Portfolio Question") {
            setIsInitialScreen(true);
        } else if (questionHistory.length > 1) {
            const previousQuestionKey = questionHistory[questionHistory.length - 2];
            setQuestionHistory((prevHistory) => prevHistory.slice(0, -1));
            setCurrentQuestionKey(previousQuestionKey);
        }
    };

    const handleTextChange = (e) => {
        const value = e.target.value;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentQuestionKey]: value,
        }));
    };

    const isNextButtonEnabled = () => {
        const selectedAnswers = answers[currentQuestionKey];
        if (isMultiSelect && selectedAnswers && selectedAnswers.length > 0) {
            return true;
        } else if (isTextOption && selectedAnswers && selectedAnswers.length > 0) {
            return true;
        } else if (!isMultiSelect && selectedAnswers) {
            return true;
        }
        return false;
    };

    return (
        <div>
            {isInitialScreen ? (
                <InitialScreen/>
            ) : showResponsesView ? (
                <ResponsesView
                    goBack={() => setShowResponsesView(false)}
                    canGetRecommendation={completedLastQuestion}
                />
            ) : (
                <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                    <h2>Workload Placement</h2>
                    <hr />
                    <div style={{ display: "flex", padding: "20px", fontFamily: "Arial, sans-serif" }}>
                        <h3 style={{ marginRight: "20px" }}>{currentQuestion?.question}</h3>
                        <select
                            value="Select Page"
                            style={{ padding: "10px", marginLeft: "20px", width: "150px" }}
                            onChange={(e) => {
                                const selectedKey = e.target.value;
                                if (selectedKey === "VSAD Select") {
                                    setIsInitialScreen(true);
                                } else {
                                    setCurrentQuestionKey(selectedKey);
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
                        <button
                            style={{
                                backgroundColor: "#d52b1e",
                                color: "white",
                                border: "none",
                                padding: "10x",
                                marginLeft: "10px",
                                cursor: "pointer",
                                borderRadius: "4px",
                                fontFamily: "Arial, sans-serif"
                            }}
                            onClick={() => setShowResponsesView(true)}
                        >
                            <b>Your Responses</b>
                        </button>
                    </div>
                    <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                        {currentAnswerArray.map((answer) => (
                            <button
                                key={answer}
                                onClick={() => handleAnswerChange(answer)}
                                style={{
                                    backgroundColor: isMultiSelect
                                        ? answers[currentQuestionKey]?.includes(answer) ? "#d52b1e" : "gray"
                                        : answers[currentQuestionKey] === answer ? "#d52b1e" : "gray",
                                    color: "white",
                                    border: "none",
                                    padding: "10px",
                                    marginBottom: "10px",
                                    cursor: "pointer",
                                    borderRadius: "4px",
                                    fontFamily: "Arial, sans-serif"
                                }}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                    {isTextOption && (
                        <textarea
                            placeholder="Specify here"
                            value={answers[currentQuestionKey] || ""}
                            onChange={handleTextChange}
                            rows={5}
                            style={{ width: "100%", padding: "10px", marginBottom: "20px", fontFamily: "Arial, sans-serif" }}
                        />
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                        <button onClick={handlePreviousQuestion} style={{ padding: "10px 20px", cursor: "pointer" }}>
                            Previous
                        </button>
                        <button onClick={handleNextQuestion} disabled={!isNextButtonEnabled()} style={{ padding: "10px 20px", cursor: "pointer" }}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export { answersExp, questionHistExp };
export { responseMap }; // Export the wrapper instead of the object directly
export default QuestionView;