import faiss
import numpy as np

def search_embeddings(query_embedding, chunks):
    k = 3
    query_embedding_array = np.expand_dims(np.array(query_embedding, dtype='float32'), axis=0)
    index = faiss.read_index(r"backend-chat\data\index.faiss")
    distances, indices = index.search(query_embedding_array, k)
    matching_chunks = [chunks[i] for i in indices[0]]
    return matching_chunks