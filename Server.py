import json
from flask import Flask
from flask import request
from flask import make_response
from flask import abort, redirect, url_for
from flask import render_template
from flask import jsonify
from flask import request

app = Flask(__name__)

@app.route("/", methods = ['GET'])
def index():
    return render_template('index.html')

app.run('0.0.0.0',8080)