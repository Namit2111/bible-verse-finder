from flask import Blueprint, request, render_template, jsonify
from flask_cors import CORS  # Import CORS
from utils.utils import get_similar_verses




bp = Blueprint('verseSearch', __name__)
CORS(bp, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Enable CORS for the blueprint (you can also apply it to the app)
CORS(bp)  # This will enable CORS for all routes in this blueprint

# Route for the home page with form submission
@bp.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        user_input = request.form['user_input']
        results = get_similar_verses(user_input)
        return render_template('index.html', results=results, user_input=user_input)
    return render_template('index.html', results=None)

# API route for similarity search
@bp.route('/api/similarity', methods=['POST'])
def similarity():
    data = request.json
    user_input = data.get('user_input')
    
    if not user_input:
        return jsonify({"error": "No input provided"}), 400
    
    results = get_similar_verses(user_input)
    
    return jsonify({
        "user_input": user_input,
        "results": results
    })
