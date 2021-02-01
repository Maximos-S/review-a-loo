from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed
from wtforms import StringField, FileField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    id = field.data
    user = User.query.filter(User.id == id).first()

    if user:
        raise ValidationError("User is already registered")

class EditUserForm(FlaskForm):
    id = IntegerField("id", validators=[DataRequired()])
    username = StringField("username", validators=[DataRequired()])
    bio = StringField("bio",validators=[DataRequired()])
    image = FileField("image", validators=[FileAllowed(['jpg', 'jpeg', 'png'], "wrong file type provided")])    