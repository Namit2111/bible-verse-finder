from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chatbot():
    data = request.get_json()
    question = data.get('question')
    response = get_answer_and_docs(question)
    return jsonify(response)
