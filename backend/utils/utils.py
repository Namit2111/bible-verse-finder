import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import nltk
nltk.download('gutenberg')
from nltk.corpus import gutenberg


# Load the KMeans model and TF-IDF vectorizer
with open('models/kmeans_model.pkl', 'rb') as f:
    loaded_km = pickle.load(f)

with open('vectorizer.pkl', 'rb') as f:
    loaded_vectorizer = pickle.load(f)

# Load and preprocess the Bible data
def load_bible_data():
    bible = gutenberg.raw('bible-kjv.txt')
    books = bible.split('\n\n\n\n\n')

    bible_data = {}
#Splitting each book into chapters and verses
    for book in books:
        book_lines = book.split('\n\n')
        book_name = book_lines[0].strip()
        bible_data[book_name] = {}

        for chapter in book_lines[1:]:
            chapter_lines = chapter.split("\n")
            chapter_number = chapter_lines[0].strip()
            verses = chapter_lines[1:]
            bible_data[book_name][chapter_number] = verses

    return bible_data

bible_data = load_bible_data()

# Transform the Bible verses using the loaded TF-IDF vectorizer
bible_verses = []
verse_indices = []
for book, chapters in bible_data.items():
    for chapter, verses in chapters.items():
        for i, verse in enumerate(verses):
            bible_verses.append(verse)
            verse_indices.append((book, chapter, i+1))

X_loaded = loaded_vectorizer.transform(bible_verses)

# Predict the clusters for the Bible verses
labels_loaded = loaded_km.predict(X_loaded)

def get_similar_verses(user_input):

        # Transform the user input using the loaded TF-IDF vectorizer
        user_input_vector = loaded_vectorizer.transform([user_input])

        # Get the indices of the verses in the predicted cluster
        cluster_indices = np.where(labels_loaded == loaded_km.predict(user_input_vector)[0])[0]

        # Get the TF-IDF vectors for the verses in the predicted cluster
        cluster_vectors = X_loaded[cluster_indices]

        # Compute similarity between the user input and each verse in the cluster
        similarities = cosine_similarity(user_input_vector, cluster_vectors).flatten()

        # Get the indices of the top 5 most similar verses
        top_indices = similarities.argsort()[-5:][::-1]

        results = []
        for index in top_indices:
            book, chapter, verse_number = verse_indices[index]
            results.append((f"{book} {chapter}:{verse_number}", bible_verses[index]))

        return results
