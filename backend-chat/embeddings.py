import torch
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path='backend-chat\.env')
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

def embedd(chunks):
    result = genai.embed_content(
        model="models/text-embedding-004",
        content=chunks)
    tensor = torch.tensor(result['embedding'], dtype=torch.float32)
    return tensor

