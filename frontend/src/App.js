import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/predict', { data: input });
            setResult(response.data.prediction);
        } catch (error) {
            console.error('Error making request:', error);
        }
    };

    return (
        <div>
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
    );
}

export default App;
