from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from analyze import pdfanalyze as reply

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["POST"])
def home():
    return jsonify({"message": "App is running"})

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_query = data.get("query", "")
    # Example response logic (replace with actual processing logic)
    rep = reply(user_query)
    return jsonify({"reply": rep})

if __name__ == "__main__":  
    app.run(port=8000)
