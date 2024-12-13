import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header';
import Sidenav from './Sidenav';

function App() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [mostCommonWord, setMostCommonWord] = useState(null);
    const [wordCount, setWordCount] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setShowResult(false); // Reset animation on new submission
        try {
            const response = await axios.post('http://localhost:5000/api/predict', { text: input });
            setResult(response.data.prediction);
            setMostCommonWord(response.data.most_common_word);
            setWordCount(response.data.most_common_count);
            setShowResult(true); // Trigger fade-in animation
        } catch (error) {
            console.error('Error making request:', error);
            setResult("Oops! Something went wrong. Please try again.");
            setShowResult(true);
        } finally {
            setLoading(false);
        }
    };

    const getSentimentStyle = (prediction) => {
        if (prediction === null) return {};
        if (prediction >= 0.5) return { color: 'green', fontWeight: 'bold' };
        if (prediction < 0.5 && prediction >= 0) return { color: 'red', fontWeight: 'bold' };
        return { color: 'gray', fontWeight: 'bold' };
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    }

    // Apply the dark-mode class to the <html> tag when isDarkMode changes
    useEffect(() => {
        if (isDarkMode) {
        document.documentElement.classList.add("dark-mode"); // Adds dark mode to <html>
        } else {
        document.documentElement.classList.remove("dark-mode"); // Removes dark mode from <html>
        }
    }, [isDarkMode]);

    return (
        <div className={isDarkMode ? "dark-mode": "light-mode"}>
            <Header toggleDarkMode={toggleDarkMode} />
            <Sidenav />
            <div id="main-content" className="main" style={{ marginLeft: '250px' }}>
                <h1>Sentiment Analysis</h1>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter your input"
                        rows="4"
                        cols="50"
                        style={{ width: '80%', fontSize: '16px', padding: '10px' }}
                    />
                    <button type="submit" style={{ display: 'block', marginTop: '20px' }}>
                        {loading ? 'Analyzing...' : 'Predict'}
                    </button>
                </form>
                
                
                {result !== null && (
                    <div
                        className={`result-box ${showResult ? 'show' : ''}`}
                        style={{
                            marginTop: '20px',
                            padding: '20px',
                            borderRadius: '8px',
                            backgroundColor: '#f4f4f9',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h3 style={getSentimentStyle(result)}>Prediction: {result}</h3>
                        <div
                            className="progress-bar"
                            style={{
                                backgroundColor: result >= 0.5 ? 'green' : result < 0.5 && result >= 0 ? 'red' : 'gray',
                            }}
                        >
                            <div
                                className="progress"
                                style={{
                                    width: `${Math.abs(result) * 100}%`,
                                    backgroundColor: result >= 0.5 ? 'green' : result < 0.5 && result >= 0 ? 'red' : 'gray',
                                }}
                            ></div>
                        </div>
                        {result >= 0.5 ? (
                            <p style={{ color: 'green' }}>👍 Positive Sentiment</p>
                        ) : result < 0.5 && result >= 0 ? (
                            <p style={{ color: 'red' }}>👎 Negative Sentiment</p>
                        ) : (
                            <p style={{ color: 'gray' }}>😐 Neutral Sentiment</p>
                        )}
                    </div>
                )}

                {mostCommonWord && (
                    <div style={{marginTop: "40px"}}>
                        <p><strong>Most Common Word:</strong> {mostCommonWord}</p>
                        <p><strong>Count:</strong> {wordCount}</p>
                    </div>
                )}

                <div id="explain" style={{ marginTop: '40px' }}>
                    <p>
                        This application will give you an estimate of the sentiment of a text prompt. If you get a score
                        lower than 0.5, it's perceived as negative. Anything higher than 0.5 is positive. Enter some text
                        above and hit submit!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;
