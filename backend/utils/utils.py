import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import nltk
nltk.download('gutenberg')
from nltk.corpus import gutenberg
# Load the KMeans model and TF-IDF vectorizer
with open('models/kmeans_model.pkl', 'rb') as f:
    loaded_km = pickle.load(f)

with open('models/vectorizer.pkl', 'rb') as f:
    loaded_vectorizer = pickle.load(f)

# Load and preprocess the Bible data
bible = gutenberg.raw('bible-kjv.txt')
books = bible.split('\n\n\n\n\n')
John = books[53]
John = John.split('\n\n')

# Transform the John verses using the loaded TF-IDF vectorizer
X_loaded = loaded_vectorizer.transform(John)

# Predict the clusters for the John verses
labels_loaded = loaded_km.predict(X_loaded)

def get_similar_verses(user_input):
    # Transform the user input using the loaded TF-IDF vectorizer
    user_input_vector = loaded_vectorizer.transform([user_input])

    # Predict the cluster for the user input
    predicted_cluster = loaded_km.predict(user_input_vector)[0]

    # Get the indices of the verses in the predicted cluster
    cluster_indices = np.where(labels_loaded == predicted_cluster)[0]

    # Get the TF-IDF vectors for the verses in the predicted cluster
    cluster_verses = [John[i] for i in cluster_indices]
    cluster_vectors = X_loaded[cluster_indices]

    # Compute similarity between the user input and each verse in the cluster
    similarities = cosine_similarity(user_input_vector, cluster_vectors).flatten()

    # Get the indices of the top 5 most similar verses
    top_indices = similarities.argsort()[-20:][::-1]

    # Prepare the results
    results = [(cluster_verses[i], similarities[i]) for i in top_indices]
    
    return results
