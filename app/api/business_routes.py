from flask import Blueprint, jsonify, request
from app.forms import RegionSearchForm, ReviewForm
from yelpapi import YelpAPI
from app.models import Business, Review, db
import requests
import os
from flask_login import current_user


yelp_api = YelpAPI(os.environ.get("YELP_API_KEY"))
business_routes = Blueprint('businesses', __name__)

# searches yelp for businesses near coordinates
@business_routes.route("/", methods=["POST"])
def searchRegion ():
    form = RegionSearchForm()
    if form.validate_on_submit:

        response = yelp_api.search_query(term='convenience stores', longitude=form.data["lng"], latitude=form.data["lat"], sort_by='rating', limit=15)
        business_list = []
        if len(response["businesses"]) == 0:
            return {"errors": ["No businesses in your area"]}
        for business in response["businesses"]:
            business_search = Business.query.filter(Business.yelp_id == business["id"]).first()


            if not business_search:
                formatAddress = ""

                for line in business["location"]["display_address"]:
                    formatAddress += line
                
                business_create = Business(
                    yelp_id = business["id"],
                    name = business["name"],
                    image_url = business["image_url"],
                    latitude = business["coordinates"]["latitude"],
                    longitude = business["coordinates"]["longitude"],
                    address = business["location"]["address1"],
                    city = business["location"]["city"],
                    phone = business["display_phone"],
                    display_address = formatAddress,
                    yelp_url = business["url"]
                )
                db.session.add(business_create)
                db.session.commit()
                business = business_create.to_dict()
            else:
                business = business_search.to_dict()
            business_list.append(business)
            
        return {"result": business_list}

    return {"errors": ["There was an error with your location search"]}


#returns business data
@business_routes.route("/<int:id>")
def get_business(id):
    business = Business.query.filter(Business.id == id).first()

    if business:
        return {"business": business.to_dict()}
    else:
        return {"errors": "Business does not exist"}

# creates a review for a business
@business_routes.route("/<int:id>", methods=["POST"])
def create_review(id):
    form = ReviewForm()
    if form.validate_on_submit:
        review = Review(
            userId=form.data["userId"],
            businessId= form.data["businessId"],
            stars = form.data["stars"],
            title = form.data["title"],
            content = form.data["content"],
        )
        db.session.add(review)
        db.session.commit()
        business = Business.query.filter(Business.id == id).first()
        count = len(business.to_dict()["reviews"])
        total_stars = 0

        for review in business.to_dict()["reviews"]:
            total_stars += review["stars"]
        avg = total_stars // count

        business.star_avg = avg
        db.session.add(business)
        db.session.commit()
        return {"business": business.to_dict()}
    else:
        return {'errors': "Please make sure all the required data is filled out"}, 401

#edit review
@business_routes.route("/<int:id>", methods=["PATCH"])
def editReview(id):
    form = ReviewForm()
    if current_user.id == form.data["userId"]:
        review = Review.query.filter(Review.id == form.data["reviewId"]).first()
        review.stars = form.data["stars"]
        review.title = form.data["title"]
        review.content = form.data["content"]

        db.session.add(review)
        db.session.commit()

        # find business and update star avg and return
        business = Business.query.filter(Business.id == id).first()

        count = len(business.to_dict()["reviews"])
        total_stars = 0

        for review in business.to_dict()["reviews"]:
            total_stars += review["stars"]
        avg = total_stars // count

        business.star_avg = avg
        db.session.add(business)
        db.session.commit()

        return {"business": business.to_dict()}
    return {"errors": "Must be logged in to edit review"}

# delete a review

@business_routes.route("/<int:businessId>/reviews/<int:reviewId>", methods=["DELETE"])
def deleteReview(businessId, reviewId):
    review = Review.query.filter(Review.id == reviewId).first()
    
    if current_user.id == review.userId:
        db.session.delete(review)
        db.session.commit()
    business = Business.query.filter(Business.id == businessId).first()

    count = len(business.to_dict()["reviews"])
    total_stars = 0

    for review in business.to_dict()["reviews"]:
        total_stars += review["stars"]

    if count > 0:
        avg = total_stars // count
    else:
        avg = 0

    business.star_avg = avg
    db.session.add(business)
    db.session.commit()

    return {"business": business.to_dict()}