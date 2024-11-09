import React from 'react';

function MainContent() {
  return (
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
  );
}

export default MainContent;
