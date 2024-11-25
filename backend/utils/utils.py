import pickle
import json
import numpy as np
from sentence_transformers import SentenceTransformer, util
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity

# Load the KMeans model and TF-IDF vectorizer
with open('models/kmeans_model.pkl', 'rb') as f:
    loaded_km = pickle.load(f)


# Load the Bible data from bible.json
with open('./bible.json', 'r') as f:
    bible_data = json.load(f)

# Filter out verses from the "Song of Solomon"
filtered_verses = [verse for verse in bible_data['verses'] if verse['book_name'] != 'Song of Solomon']

# Extract text, book name, chapter, and verse
verses = [verse['text'] for verse in filtered_verses]
metadata = [(verse['book_name'], verse['chapter'], verse['verse']) for verse in filtered_verses]

# Load the sentence transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Embed the verses
embeddings = model.encode(verses, convert_to_tensor=True)

# Cluster the embeddings using KMeans
num_clusters = 350 
kmeans = KMeans(n_clusters=num_clusters)
kmeans.fit(embeddings.cpu().numpy())
labels = kmeans.labels_


def get_similar_verses(user_input):
    # Embed the user input
    user_input_embedding = model.encode([user_input], convert_to_tensor=True)

    # Predict the cluster for the user input
    predicted_cluster = kmeans.predict(user_input_embedding.cpu().numpy())[0]

    # Get the indices of the verses in the predicted cluster
    cluster_indices = np.where(labels == predicted_cluster)[0]

    # Compute similarity between the user input and each verse in the cluster
    cluster_embeddings = embeddings[cluster_indices]
    similarities = util.pytorch_cos_sim(user_input_embedding, cluster_embeddings)[0]

    # Get the indices of the top 20 most similar verses within the cluster
    top_indices = similarities.argsort(descending=True)[:20]

    # Prepare the results
    results = [{
        'verse': verses[cluster_indices[i]],
        'book_name': metadata[cluster_indices[i]][0],
        'chapter': metadata[cluster_indices[i]][1],
        'verse_number': metadata[cluster_indices[i]][2],
        'similarity': similarities[i].item()
    } for i in top_indices]

    return results

# # Example usage
# user_input = "Love thy neighbor"
# similar_verses = get_similar_verses(user_input)
# for result in similar_verses:
#     print(f"Verse: {result['verse']}, Book: {result['book_name']}, Chapter: {result['chapter']}, Verse: {result['verse_number']}, Similarity: {result['similarity']:.4f}")
