from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
import utils.utils as utils  # Updated import statement

app = Flask(__name__)
CORS(app)

# Initialize Qdrant and model outside the request handler (at app startup)
client = utils.initialize_qdrant_client()
model = SentenceTransformer('all-MiniLM-L6-v2')
# vector_size = model.get_sentence_embedding_dimension()
# utils.create_collection(client, utils.COLLECTION_NAME, vector_size)
@app.route('/api/similarity', methods=['POST'])
def similarity():
    data = request.get_json()
    if data is None:
        return jsonify({'error': 'Invalid JSON data'}), 400  # Bad Request
    try:
        user_input = data['userInput']
    except KeyError:
        return jsonify({'error': 'Missing "userInput" key in JSON data'}), 400  # Bad Request
    similar_verses = utils.get_similar_verses(client, utils.COLLECTION_NAME, user_input, model)
    return jsonify({'results': similar_verses, 'user_input': user_input})

if __name__ == '__main__':
    # utils.initialize_and_load() # Only run this once to populate the database!!! NEVER RUN AGAIN UNLESS UPDATING THE DATA
    app.run(debug=True, host='0.0.0.0', port=5000)