from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model
model = tf.keras.models.load_model('SAM.keras')

# Tokenizer for predictions
with open("tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)

# Prediction function
# Print statements are all for debug
def predict(text, tokenizer):
    text = [text["text"]]
    print(text)
    new_texts_seq = tokenizer.texts_to_sequences(text)
    print("Tokenized sequence:", new_texts_seq)
    new_texts_pad = pad_sequences(new_texts_seq, maxlen=100)
    # print("Padded sequence:", new_texts_pad)

    predictions = model.predict(new_texts_pad)
    # print("Predictions (probabilities):", predictions)  # Log the raw predictions

    # Debug for the tokenizer's vocabulary or the model summary
    # print("Tokenizer word index:", tokenizer.word_index)
    # model.summary()

    # Convert probabilities to binary (0 or 1)
    # predicted_labels = (predictions > 0.5).astype(int)
    # print(predictions)
    return {"prediction": predictions.tolist()}  # Convert to list for JSON

@app.route('/api/predict', methods=['POST'])
def predict_route():
    data = request.json
    if isinstance(data, dict) and 'text' in data:
        texts = [data['text']]  # Ensure input is a list of text strings
    else:
        return jsonify({"error": "Invalid input"}), 400
    prediction = predict(data, tokenizer)
    return jsonify(prediction)


if __name__ == '__main__':
    app.run(debug=True)
