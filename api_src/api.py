from flask import Flask, jsonify
from markupsafe import escape
from static_data.models import MODELS

from static_data.options import OPTIONS


app = Flask(__name__)


@app.route("/models")
def models():
    body = MODELS
    response = jsonify(body)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/options/<model_id>")
def options(model_id: str):
    body = OPTIONS[escape(model_id)]
    response = jsonify(body)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


app.run(host="0.0.0.0", port=8777, debug=True)
