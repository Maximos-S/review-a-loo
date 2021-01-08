from .db import db

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    stars = db.Column(db.Integer, nullable=False)
    businessId = db.Column(db.ForeignKey("businesses.id"))
    userId = db.Column(db.ForeignKey("users.id"))
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.String(610), nullable=False)

    @property
    def get_stars(self):
        return self.stars

    def to_dict(self):
        return {
            "id": self.id,
            "stars": self.stars,
            "businessId": self.businessId,
            "userId": self.userId,
            "title": self.title,
            "content": self.content,
        }
