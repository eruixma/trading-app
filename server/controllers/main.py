from flask import Blueprint, current_app

main = Blueprint('main', __name__)


@main.route('/')
def home():
    return current_app.send_static_file('index.html')

