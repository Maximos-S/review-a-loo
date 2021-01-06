from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

def email_exists(form, field):
    print("Checking if email exists", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()

    if user:
        raise ValidationError("Email is already registered")

def user_exists(form, field):
    print("Checking if user exists", field.data)
    username = field.data
    user = User.query.filter(User.username == username).first()

    if user:
        raise ValidationError("User is already registered")

class SignUpForm(FlaskForm):
    username = StringField("username", validators=[DataRequired(), user_exists])
    email = StringField("email", validators=[DataRequired(), email_exists])
    password = StringField('password', validators=[DataRequired()])
    