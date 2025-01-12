import pickle
from PyPDF2 import PdfReader
from store_embeddings import search_embeddings
from embeddings import embedd
from response import response

def pdfanalyze(query):
    chunked = pickle.load(open(r'backend-chat\data\chunked_data.pkl', 'rb'))
    query_embedding = embedd(query)
    result = search_embeddings(query_embedding, chunked)
    resp = response(result, query)
    return resp