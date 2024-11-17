import React from 'react';

function MainContent() {
  return (
    <div id="main-content" className="main" style={{ marginLeft: '250px' }}>
      <h1>Machine Learning Predictor</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Enter your input"
                    rows="4"          // Optional: Controls the height (number of lines visible)
                    cols="50"         // Optional: Controls the width (number of characters visible)
                    style={{ width: '100%', fontSize: '16px', padding: '10px' }} // Optional: Custom styles
                />
                <button type="submit">Predict</button>
            </form>
            {result && <p>Prediction: {result}</p>}
    </div>
  );
}

export default MainContent;
