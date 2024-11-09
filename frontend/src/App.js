import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header';
import Sidenav from './Sidenav';
// import MainContent from './MainContent';

function App() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/predict', { text: input });
            setResult(response.data.prediction);
        } catch (error) {
            console.error('Error making request:', error);
        }
    };

    return (
        <div>
            <Header />
            <Sidenav />
            <div id="main-content" className="main" style={{ marginLeft: '250px' }}>
                <h1>Machine Learning Predictor</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Enter your input"
                    />
                    <button type="submit">Predict</button>
                </form>
                {result && <p>Prediction: {result}</p>}
        </div>
            
        </div>
    );
}

export default App;
