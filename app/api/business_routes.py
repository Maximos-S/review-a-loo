from flask import Blueprint, jsonify

business_routes = Blueprint('businesses', __name__)


# @business_routes.route("/")