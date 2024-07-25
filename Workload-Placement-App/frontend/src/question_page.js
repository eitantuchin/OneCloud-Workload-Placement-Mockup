import React, { useState } from "react";
import decisionTree from "./decision_tree"; // Assuming the decision tree is exported from another file
import InitialScreen from "./start_page"; // Assuming this is the initial screen component

var selectedServiceAnswers;

function QuestionView() {
    const [currentQuestionKey, setCurrentQuestionKey] = useState("Portfolio Question");
    const [answers, setAnswers] = useState({});
    const [questionHistory, setQuestionHistory] = useState(["VSAD Select", "Portfolio Question"]);
    const [textValue, setTextValue] = useState("");
    const [isInitialScreen, setIsInitialScreen] = useState(false);

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
        } 
        else {
            setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [currentQuestionKey]: answer,
            }));
        }
    };


    

    const handleNextQuestion = () => {
        const selectedAnswers = answers[currentQuestionKey];
        let nextQuestionKey;
        if (currentQuestionKey === "Services Required") {
            selectedServiceAnswers = selectedAnswers;
            if (selectedAnswers.includes("Database")) {
                nextQuestionKey = "Database";
            } 
            else if (selectedAnswers.includes("Standard computing")) {
                nextQuestionKey = "Standard computing";
            } 
            else if (selectedAnswers.includes("GenAI/LLM")) {
                nextQuestionKey = "GenAI/LLM";
            } 
            else {
                nextQuestionKey = "Other options";
            }
        } 
        else if (currentQuestionKey === "DBA") {
            console.log(selectedServiceAnswers)
            if (selectedServiceAnswers.includes("Standard computing")) {
                nextQuestionKey = "Standard computing";
            } 
            else if (selectedServiceAnswers.includes("GenAI/LLM")) {
                nextQuestionKey = "GenAI/LLM";
            } 
            else {
                nextQuestionKey = "Other options";
            }
        } 
        else if (currentQuestionKey === "OS Required") {
            console.log(selectedServiceAnswers)
            if (selectedServiceAnswers.includes("GenAI/LLM")) {
                nextQuestionKey = "GenAI/LLM";
            } 
            else {
                nextQuestionKey = "Other options";
            }
        } 
        else if (currentQuestionKey === "Database" && selectedAnswers.includes("MS-SQL Server")) {
            nextQuestionKey = "MS-SQL Server";
        } 
        else if (currentQuestionKey === "Database" && !selectedAnswers.includes("MS-SQL Server")) {
            nextQuestionKey = "Other options";
        } 
        else if (Array.isArray(selectedAnswers)) {
            nextQuestionKey = "All options";
        } 
        else if (selectedAnswers in currentQuestion) {
            nextQuestionKey = selectedAnswers;
        } 
        else {
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
        setTextValue(value);
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentQuestionKey]: value,
        }));
    };

    const isNextButtonEnabled = answers[currentQuestionKey] || isTextOption;

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            {isInitialScreen ? (
                <InitialScreen goToQuestionView={() => setIsInitialScreen(false)} />
            ) : (
                <div>
                    <h2>Workload Placement</h2>
                    <hr />
                    <h3>{currentQuestion?.question}</h3>
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
                            value={textValue}
                            onChange={handleTextChange}
                            rows={5}
                            style={{ width: "100%", padding: "10px", marginBottom: "20px", fontFamily: "Arial, sans-serif" }}
                        />
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                        <button onClick={handlePreviousQuestion} style={{ padding: "10px 20px", cursor: "pointer" }}>
                            Previous
                        </button>
                        <button onClick={handleNextQuestion} disabled={!isNextButtonEnabled} style={{ padding: "10px 20px", cursor: "pointer" }}>
                            Next
                        </button>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <select
                            value={currentQuestionKey}
                            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                            onChange={(e) => {
                                const selectedKey = e.target.value;
                                if (selectedKey === "VSAD Select") {
                                    setIsInitialScreen(true);
                                } else {
                                    setCurrentQuestionKey(selectedKey);
                                }
                            }}
                        >
                            {questionHistory.map((key) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                        <h2 style={{ textAlign: "center" }}>Please Select To Continue</h2>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuestionView;
