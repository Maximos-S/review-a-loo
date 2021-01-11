from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    reviewId = IntegerField("reviewId",)
    stars = IntegerField("stars", validators=[DataRequired()])
    businessId = IntegerField("businessId", validators=[DataRequired()])
    userId = IntegerField("userId", validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired()])
    content = StringField("content", validators=[DataRequired()])
