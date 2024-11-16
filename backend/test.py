import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle


# Load the model
model = tf.keras.models.load_model('SAM.keras')

# Load the tokenizer
with open("tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)

text = input("Give the model some text:\n")
text = str(text)

new_texts_seq = tokenizer.texts_to_sequences(text)
print("Tokenized sequence:", new_texts_seq)  # Print tokenized sequence

new_texts_pad = pad_sequences(new_texts_seq, maxlen=100)
print("Padded sequence:", new_texts_pad)  # Print padded sequence

predictions = model.predict(new_texts_pad)
print("Predictions (probabilities):", predictions)  # Log the raw predictions

# new_texts_seq = tokenizer.texts_to_sequences(new_texts)
# new_texts_pad = pad_sequences(new_texts_seq, maxlen=MAX_LEN)
# predictions = model.predict(new_texts_pad)

# Convert probabilities to binary (0 or 1)
# predicted_labels = (predictions > 0.5).astype(int)
print(predictions)

# def predict_route():
#     data = request.json
#     if isinstance(data, dict) and 'text' in data:
#         texts = [data['text']]  # Ensure input is a list of text strings
#     else:
#         return jsonify({"error": "Invalid input"}), 400
#     prediction = predict(data, tokenizer)
#     return jsonify(prediction)