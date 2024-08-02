import { React, useState, useRef } from "react";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import InitialScreen from "./start_page";
import { recommendation } from "./review_responses";
import { responseMapWrapper } from "./question_page";
import { responseMap } from "./question_page"
import { responseDatabase } from "./index";

function RecommendationView() {
    const [showStart, setShowStart] = useState(false);
    const inputRef = useRef(null);

    const handleRestartClick = () => {
        console.log(responseMap);
        responseMapWrapper.reset(); // Use wrapper to reset
        setShowStart(true);
    };

    if (showStart) {
        return <InitialScreen />;
    }

    const handleDownloadPDF = () => {
        const input = inputRef.current;
        html2canvas(input).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('recommendation.pdf');
        });
    };

   

    async function logDatabaseContents() {
        try {
          const allDocs = await responseDatabase.responses.find().exec();
          console.log("Database Contents:", allDocs.map(doc => doc.toJSON()));
        } catch (error) {
          console.error("Error fetching database contents:", error);
        }
      }
      
      // Call the debugging function
      logDatabaseContents();

    return (
        <div ref={inputRef} style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2>Workload Placement</h2>
            <hr />
            <div style={{ alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ marginRight: "20px" }}>Recommendation</h3>
                <p>{recommendation}</p>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        style={{
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            cursor: "pointer",
                            borderRadius: "4px",
                            fontFamily: "Arial, sans-serif"
                        }}
                        onClick={handleRestartClick}
                    >
                        <b>Restart</b>
                    </button>
                    <button onClick={handleDownloadPDF} style={{
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            cursor: "pointer",
                            borderRadius: "4px",
                            fontFamily: "Arial, sans-serif"
                        }}>
                        <b>Download PDF</b>
                    </button>
                </div>
            </div>
            <div style={{ marginTop: "20px" }}>
                <h3>Contact Us</h3>
                <p>Email: example@gmail.com</p>
                <p>Phone: 123-456-7890</p>
            </div>
        </div>
    );
}

export default RecommendationView;
