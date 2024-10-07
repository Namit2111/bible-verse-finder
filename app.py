from flask import Flask, request, render_template
import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import gutenberg
from functools import lru_cache

app = Flask(__name__)

# Constants
TOP_RESULTS = 5
MODEL_PATH = 'kmeans_model.pkl'
VECTORIZER_PATH = 'vectorizer.pkl'

# Load the KMeans model and TF-IDF vectorizer
def load_model(path):
    with open(path, 'rb') as f:
        return pickle.load(f)

# Initialize models and data
try:
    loaded_km = load_model(MODEL_PATH)
    loaded_vectorizer = load_model(VECTORIZER_PATH)
    
    # Download required NLTK data if not already present
    nltk.download('gutenberg', quiet=True)
    
    # Load and preprocess the Bible data
    bible = gutenberg.raw('bible-kjv.txt')
    books = bible.split('\n\n\n\n\n')
    John = books[53].split('\n\n')
    
    # Transform the John verses using the loaded TF-IDF vectorizer
    X_loaded = loaded_vectorizer.transform(John)
    
    # Predict the clusters for the John verses
    labels_loaded = loaded_km.predict(X_loaded)
except Exception as e:
    print(f"Error during initialization: {e}")
    raise

@lru_cache(maxsize=100)
def process_user_input(user_input):
    """
    Process user input and return the predicted cluster and vector.
    Uses caching to improve performance for repeated inputs.
    """
    user_input_vector = loaded_vectorizer.transform([user_input])
    predicted_cluster = loaded_km.predict(user_input_vector)[0]
    return predicted_cluster, user_input_vector

def find_similar_verses(predicted_cluster, user_input_vector):
    """
    Find the most similar verses to the user input within the predicted cluster.
    """
    # Get the indices of the verses in the predicted cluster
    cluster_indices = np.where(labels_loaded == predicted_cluster)[0]
    
    # Get the TF-IDF vectors for the verses in the predicted cluster
    cluster_verses = [John[i] for i in cluster_indices]
    cluster_vectors = X_loaded[cluster_indices]
    
    # Compute similarity between the user input and each verse in the cluster
    similarities = cosine_similarity(user_input_vector, cluster_vectors).flatten()
    
    # Get the indices of the top N most similar verses
    top_indices = similarities.argsort()[-TOP_RESULTS:][::-1]
    
    return [(cluster_verses[i], similarities[i]) for i in top_indices]

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        user_input = request.form['user_input'].strip()
        
        if not user_input:
            return render_template('index.html', error="Please enter some text.")
        
        try:
            # Process user input and find similar verses
            predicted_cluster, user_input_vector = process_user_input(user_input)
            results = find_similar_verses(predicted_cluster, user_input_vector)
            
            return render_template('index.html', results=results, user_input=user_input)
        except Exception as e:
            return render_template('index.html', error=f"An error occurred: {str(e)}")
    
    return render_template('index.html', results=None)

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')