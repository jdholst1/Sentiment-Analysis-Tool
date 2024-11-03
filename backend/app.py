from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your trained model
model = tf.keras.models.load_model('SAM.keras')

# Tokenizer for predictions
tokenizer = Tokenizer(num_words=10000)
# tokenizer.fit_on_tests("test.txt")      #This might be unnecessary


# Example ML model prediction function
def predict(text, tokenizer):
    new_texts_seq = tokenizer.texts_to_sequences(text)
    new_texts_pad = pad_sequences(new_texts_seq, maxlen=100)
    predictions = model.predict(new_texts_pad)

    # Convert probabilities to binary (0 or 1)
    # predicted_labels = (predictions > 0.5).astype(int)
    # print(predictions)
    return {"prediction": predictions.tolist()}  # Convert to list for JSON

@app.route('/api/predict', methods=['POST'])
def predict_route():
    data = request.json
    prediction = predict(data)
    return jsonify(prediction)


if __name__ == '__main__':
    result = predict("Oh my goodness, this is awful!", tokenizer)
    print(result)
    # app.run(debug=True)
