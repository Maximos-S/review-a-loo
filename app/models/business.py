from .db import db


class Business(db.Model):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    yelp_id = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    star_avg = db.Column(db.Float,)
    image_url = db.Column(db.String(255))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(15))
    display_address = db.Column(db.String(255))
    yelp_url = db.Column(db.String(255))

    reviews = db.relationship('Review',
                                backref="business", 
                                lazy="joined",
                                # primaryjoin= id == reviews.c.businessId
                                )
    
    @property
    def get_star_avg(self):
        return self.star_avg

    @get_star_avg.setter
    def set_star_avg(self, avg):
        self.star_avg = avg

    def to_dict(self):
        return {
            "id": self.id,
            "yelpId": self.yelp_id,
            "name": self.name,
            "starAvg": self.star_avg,
            "image": self.image_url,
            "displayAddress": self.display_address,
            "phone": self.phone,
            "yelpUrl": self.yelp_url,
            "reviews": [review.to_dict() for review in self.reviews]
        }