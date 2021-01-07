from flask import Blueprint, jsonify, request
from app.forms import RegionSearchForm
from yelpapi import YelpAPI
from app.models import Business, db
import requests
import os

yelp_api = YelpAPI(os.environ.get("YELP_API_KEY"))
business_routes = Blueprint('businesses', __name__)


@business_routes.route("/", methods=["POST"])
def searchRegion ():
    form = RegionSearchForm()
    if form.validate_on_submit:
        print("###################", form.data["lat"], form.data["lng"])
        # url = "https://api.yelp.com/v3/businesses/search?term=gas&latitude=37.786882&longitude=-122.399972"
        # headers = {'Authorization': 'Bearer={token}'.format(token=os.environ.get("YELP_API_KEY"))}

        # print("headers", headers)
        response = yelp_api.search_query(term='convenience stores', longitude=form.data["lng"], latitude=form.data["lat"], sort_by='rating', limit=10)
        business_list = []
        for business in response["businesses"]:
            business = Business.query.filter(Business.yelp_id == business.id).first()
            if not business:
                business = Business(
                    yelp_id = business.id,
                    name = business.name,
                    image_url = business.image_url,
                    latitude = form.data["lat"],
                    longitude = form.data["lng"],
                    address = business.address1,
                    city = business.city,
                    display_address = business.display_address,
                    yelp_url = business.url
                )
        return {"result": response['businesses']}
    return {"error": "There was an error with your location search"}


