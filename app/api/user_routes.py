from flask import Blueprint, jsonify
import boto3
import uuid
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
import mimetypes
from app.models import User, db
from app.forms import EditUserForm
import uuid
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
@user_routes.route('/<int:id>', methods=['POST'])
def edit_user(id):
    if id == 1:
        return {"errors": "not authorized"}
    if current_user.id != id:
        return {"errors": ["not authorized"]}
    user = User.query.get(id)
    form = EditUserForm()
    if form.validate_on_submit:
        if form.data['image']:
            img_name = str(uuid.uuid4())
            print("#####", img_name)
            img = form.data['image']
            file_name = secure_filename(img.filename)
            mime_type = mimetypes.guess_type(file_name)
            s3 = boto3.resource('s3')
            uploaded_image = s3.Bucket('review-a-loo-profile-image').put_object(Key=img_name, Body=img, ACL="public-read", ContentType=mime_type[0])

            img_path = f"https://review-a-loo-profile-image.s3.us-east-2.amazonaws.com/{img_name}"
            user.img_url = img_path
        if form.data['bio']:
            user.bio = form.data['bio']
        if form.data["username"]:
            user.username = form.data["username"]
        db.session.add(user)
        db.session.commit()

        return user.to_dict()
    else:
        return {"errors": ["did not submit",]}