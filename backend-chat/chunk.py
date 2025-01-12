from langchain.text_splitter import RecursiveCharacterTextSplitter
import pickle

def chunk_(resume_text):
    splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=50)
    chunks = splitter.split_text(resume_text)
    with open(r'backend-chat\data\chunked_data.pkl', 'wb') as f:
        pickle.dump(chunks, f)
    return chunks