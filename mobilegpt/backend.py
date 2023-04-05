from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/generate-text', methods=['POST'])
def generate_text():
    # Get the text data from the request
    text = request.form.get('text')

    # Sample text for now 
    generated_text = 'This is a sample generated text'

    # Return the generated text as a response
    response = jsonify({'generated_text': generated_text})
    response.headers.add('Content-Type', 'application/json')
    return response

if __name__ == '__main__':
    app.run()

