// App.js
import React, { useState } from 'react';
import ResponsesView from './review_responses';
import RecommendationView from './recommendation';

function App() {
    const [view, setView] = useState('responses'); // Default view is 'responses'

    const handleGetRecommendation = () => {
        setView('recommendation'); // Switch to recommendation view
    };

    const handleGoBack = () => {
        setView('responses'); // Switch back to responses view
    };

    const handleRestartProcess = () => {
        setView('start'); // Switch back to start page (you need to handle this view separately)
    };

    return (
        <div>
            {view === 'responses' && (
                <ResponsesView
                    goBack={handleGoBack}
                    getRecommendation={handleGetRecommendation}
                    canGetRecommendation={true} // Set this based on your logic
                />
            )}
            {view === 'recommendation' && (
                <RecommendationView
                    goBackToResponses={handleGoBack}
                    restartProcess={handleRestartProcess}
                />
            )}
            {/* Implement the start page view separately if needed */}
        </div>
    );
}

export default App;
