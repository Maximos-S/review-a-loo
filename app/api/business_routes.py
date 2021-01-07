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
        # url = "https://api.yelp.com/v3/businesses/search?term=gas&latitude=37.786882&longitude=-122.399972"
        # headers = {'Authorization': 'Bearer={token}'.format(token=os.environ.get("YELP_API_KEY"))}

        # print("headers", headers)
        response = yelp_api.search_query(term='convenience stores', longitude=form.data["lng"], latitude=form.data["lat"], sort_by='rating', limit=10)
        business_list = []
        for business in response["businesses"]:
            business_search = Business.query.filter(Business.yelp_id == business["id"]).first()
            if not business_search:
                # print("############################", business)
                business_create = Business(
                    yelp_id = business["id"],
                    name = business["name"],
                    image_url = business["image_url"],
                    latitude = form.data["lat"],
                    longitude = form.data["lng"],
                    address = business["location"]["address1"],
                    city = business["location"]["city"],
                    phone = business["display_phone"],
                    display_address = business["location"]["display_address"],
                    yelp_url = business["url"]
                )
                db.session.add(business_create)
                db.session.commit()
                business = business_create.to_dict()
            else:
                business = business_search.to_dict()
            business_list.append(business)
        # print(business_list)   
        return {"result": business_list}
    return {"error": "There was an error with your location search"}


