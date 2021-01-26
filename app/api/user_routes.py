from flask import Blueprint, jsonify
import boto3
import uuid
from flask_login import login_required
from app.models import User, current_user
from app.forms import EditUserForm

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
def user(id):
    user = User.query.get(id)
    return user.to_dict_reviews()

## edit user
@user_routes.rout('/<int:id>', methods=['POST'])
def edit_user(id):
    if id == 1:
        return {"error": "not authorized"}
    if current_user.id != id:
        return {"error": "not authorized"}
    user = User.query.get(id)
    form = EditUserForm()
    if form.validate_on_submit():
        if form.data['image']:

