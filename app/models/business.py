from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Business(db.Model):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    yelp_id = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(15))
    display_address = db.Column(db.String(255))
    yelp_url = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "yelpId": self.yelp_id,
            "name": self.name,
            "image": self.image_url,
            "displayAddress": self.display_address,
            "phone": self.phone,
            "yelpUrl": self.yelp_url
        }