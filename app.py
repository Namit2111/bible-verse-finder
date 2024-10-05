from flask import Flask, request, render_template
import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import nltk
nltk.download('gutenberg')
from nltk.corpus import gutenberg

app = Flask(__name__)

# Load the KMeans model and TF-IDF vectorizer
with open('kmeans_model.pkl', 'rb') as f:
    loaded_km = pickle.load(f)

with open('vectorizer.pkl', 'rb') as f:
    loaded_vectorizer = pickle.load(f)

# Load and preprocess the Bible data
bible = gutenberg.raw('bible-kjv.txt')
books = bible.split('\n\n\n\n\n')

# Dictionary to hold the structured Bible data
bible_dict = {}

def clean_verses(verses):
    cleaned_verses = []
    for verse in verses:
        cleaned_verse = ''.join([char for char in verse if not char.isdigit() and char != ':'])
        cleaned_verse = cleaned_verse.replace("\n", " ").strip()
        cleaned_verses.append(cleaned_verse)
    return cleaned_verses

for book in books:
    lines = book.split('\n\n')
    if lines:
        book_title = lines[0].strip()
        bible_dict[book_title] = {}
        current_chapter = 1
        chapters = {current_chapter: []}
        
        for line in lines[1:]:
            if line.strip().startswith('Chapter'):
                current_chapter = int(line.split()[1])
                chapters[current_chapter] = []
            else:
                chapters[current_chapter].append(line.strip())
        
        bible_dict[book_title] = {chapter: clean_verses(verses) for chapter, verses in chapters.items()}

# Prepare data for clustering
all_verses = []
verse_indices = []

for book, chapters in bible_dict.items():
    for chapter, verses in chapters.items():
        for i, verse in enumerate(verses):
            all_verses.append(verse)
            verse_indices.append((book, chapter, i+1))

# Transform the verses using the loaded TF-IDF vectorizer
X_loaded = loaded_vectorizer.transform(all_verses)

# Predict the clusters for the verses
labels_loaded = loaded_km.predict(X_loaded)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        user_input = request.form['user_input']

        # Transform the user input using the loaded TF-IDF vectorizer
        user_input_vector = loaded_vectorizer.transform([user_input])

        # Predict the cluster for the user input
        predicted_cluster = loaded_km.predict(user_input_vector)[0]

        # Get the indices of the verses in the predicted cluster
        cluster_indices = np.where(labels_loaded == predicted_cluster)[0]

        # Get the TF-IDF vectors for the verses in the predicted cluster
        cluster_verses = [all_verses[i] for i in cluster_indices]
        cluster_vectors = X_loaded[cluster_indices]

        # Compute similarity between the user input and each verse in the cluster
        similarities = cosine_similarity(user_input_vector, cluster_vectors).flatten()

        # Get the indices of the top 5 most similar verses
        top_indices = similarities.argsort()[-5:][::-1]

        # Prepare the results with book, chapter, and verse numbers
        results = [(verse_indices[cluster_indices[i]], cluster_verses[i], similarities[i]) for i in top_indices]

        return render_template('index.html', results=results, user_input=user_input)

    return render_template('index.html', results=None)

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
