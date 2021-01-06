from flask import Blueprint, jsonify, request
from app.forms import RegionSearchForm
from yelpapi import YelpAPI
import requests
import os

yelp_api = YelpAPI(os.environ.get("YELP_API_KEY"))
business_routes = Blueprint('businesses', __name__)


@business_routes.route("/", methods=["POST"])
def searchRegion ():
    form = RegionSearchForm()
    # url = "https://api.yelp.com/v3/businesses/search?term=gas&latitude=37.786882&longitude=-122.399972"
    # headers = {'Authorization': 'Bearer={token}'.format(token=os.environ.get("YELP_API_KEY"))}

    # print("headers", headers)
    response = yelp_api.search_query(term='ice cream', location='austin, tx', sort_by='rating', limit=5)
    print("############################", response)
    return {"hello": "hello"}