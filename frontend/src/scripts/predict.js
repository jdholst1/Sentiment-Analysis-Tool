document.getElementById('submitButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;

    // Make sure input is not empty
    if (!inputText.trim()) {
        alert("Please enter some text.");
        return;
    }

    // Prepare the data to be sent
    const data = {
        text: inputText
    };

    // Make the POST request to the Flask API
    fetch('http://localhost:5000/api/predict', { // Adjust the URL if necessary
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Prediction:', data); // Handle the response from the backend
        // You can display the prediction result to the user here
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});