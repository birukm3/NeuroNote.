from flask import Flask, request, jsonify
from flask_cors import CORS
from flashcards import generate_flashcards
from extract import extract_text_from_pdf
from dotenv import load_dotenv, find_dotenv
import os
import pprint
from pymongo import MongoClient
from datetime import datetime

load_dotenv(find_dotenv())
password = os.environ.get("MONGODB_PWD")

connection_string = F"mongodb+srv://mollabiruk63:{password}@cluster0.fmbyqle.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(connection_string)
db = client.neuronote
flashcards_collections = db.flashcards


app = Flask(__name__)
CORS(app)
ALLOWED_EXTENSIONS = {'pdf'}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB
MAX_TEXT_LENGTH = 100000  # Prevent processing extremely long documents

app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/generate', methods=['POST'])
def generate():
    class_name = request.form.get("class")
    user_id = request.form.get("userID")

    if 'pdf' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400

    file = request.files['pdf']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type. Only PDF files are allowed'}), 400

    try:
        # Read file bytes directly
        file_bytes = file.read()
        
        if not file_bytes:
            return jsonify({'error': 'Empty file uploaded'}), 400

        # Extract text from PDF
        text = extract_text_from_pdf(file_bytes)
        
        if not text or not text.strip():
            return jsonify({'error': 'No text could be extracted from the PDF'}), 400
        
        if len(text) > MAX_TEXT_LENGTH:
            return jsonify({'error': f'Document too long. Maximum {MAX_TEXT_LENGTH} characters allowed.'}), 400

        # Generate flashcards from extracted text
        flashcards = generate_flashcards(text)
        
        if not flashcards:
            return jsonify({'error': 'No flashcards could be generated from the text'}), 400

        for card in flashcards:
            card["class"] = class_name
            card["user_id"] = user_id
            card["created_at"] = datetime.utcnow()
        

        flashcards_collections.insert_many(flashcards)
        for card in flashcards:
            card.pop("_id", None)

        return jsonify(flashcards)
    except Exception as e:
        return jsonify({'error': f'Failed to process file: {str(e)}'}), 500


@app.route('/flashcards/<user_id>', methods =['GET'])
def get_flashcards(user_id):
    flashcards = list(flashcards_collections.find({"user_id": user_id}, {"_id": 0}))
    grouped = {}
    for card in flashcards:
            subject = card.get("class", "uncategorized")
            grouped.setdefault(subject, []).append(card)

    return jsonify(grouped)
    


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5050))
    app.run(host="0.0.0.0", port=port, debug=False)