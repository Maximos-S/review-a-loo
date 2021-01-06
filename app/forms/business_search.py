from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextAreaField, FileField
from wtforms.validators import DataRequired, ValidationError

class RegionSearchForm(FlaskForm):
    lat = StringField('lat', validators=[DataRequired()])
    lng = FileField('lng', validators=[DataRequired()])