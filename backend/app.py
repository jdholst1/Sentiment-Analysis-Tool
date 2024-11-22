from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from collections import Counter
import pickle
import re

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
    line = text["text"]
    text = [text["text"]]
    # print(text)
    new_texts_seq = tokenizer.texts_to_sequences(text)
    # print("Tokenized sequence:", new_texts_seq)
    new_texts_pad = pad_sequences(new_texts_seq, maxlen=100)
    # print("Padded sequence:", new_texts_pad)

    # Flatten the list of token sequences to get all tokens
    # flat_tokens = [item for sublist in new_texts_seq for item in sublist]
    
    # Alternatively, you can directly split the raw text into words
    # Remove non-alphanumeric characters and convert to lowercase for more consistent results
    cleaned_text = re.sub(r'[^a-zA-Z\s]', '', line).lower()
    words = cleaned_text.split()
    
    # Count word frequencies using Counter
    word_counts = Counter(words)
    
    # Get the most common word (and its count)
    most_common_word, most_common_count = word_counts.most_common(1)[0] if word_counts else (None, None)
    
    # Get the most common word (and its count)
    # most_common_word, most_common_count = word_counts.most_common(1)[0] if word_counts else (None, None)

    predictions = model.predict(new_texts_pad)

    # Debug for the tokenizer's vocabulary or the model summary
    # print("Tokenizer word index:", tokenizer.word_index)
    # model.summary()

    # Convert probabilities to binary (0 or 1)
    # predicted_labels = (predictions > 0.5).astype(int)
    # print(predictions)
    return {"prediction": predictions.tolist(),
            "most_common_word": most_common_word,
            "most_common_count": most_common_count
            }  

@app.route('/api/predict', methods=['POST'])
def predict_route():
    data = request.json
    if isinstance(data, dict) and 'text' in data:
        texts = [data['text']]
    else:
        return jsonify({"error": "Invalid input"}), 400
    prediction = predict(data, tokenizer)
    return jsonify(prediction)


if __name__ == '__main__':
    app.run(debug=True)
