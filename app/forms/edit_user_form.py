from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exists", field.data)
    username = field.data
    user = User.query.filter(User.username == username).first()

    if user:
        raise ValidationError("User is already registered")

class EditUserForm(FlaskForm):
    username = StringField("username", validators=[DataRequired(), user_exists])
    bio = StringField("bio")
    image = FileField("image", validators=[FileAllowed(['jpg', 'jpeg', 'png'], "wrong file type provided")])
    password = StringField('password', validators=[DataRequired()])
    