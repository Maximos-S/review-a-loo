"""empty message

Revision ID: 99ef36547238
Revises: 
Create Date: 2021-01-26 19:40:52.778092

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '99ef36547238'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('businesses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('yelp_id', sa.String(length=255), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('star_avg', sa.Float(), nullable=True),
    sa.Column('image_url', sa.String(length=255), nullable=True),
    sa.Column('latitude', sa.Float(), nullable=True),
    sa.Column('longitude', sa.Float(), nullable=True),
    sa.Column('address', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=255), nullable=False),
    sa.Column('phone', sa.String(length=15), nullable=True),
    sa.Column('display_address', sa.String(length=255), nullable=True),
    sa.Column('yelp_url', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('yelp_id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('img_url', sa.String(length=100), nullable=False),
    sa.Column('bio', sa.String(length=255), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('stars', sa.Integer(), nullable=False),
    sa.Column('businessId', sa.Integer(), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('content', sa.String(length=610), nullable=False),
    sa.ForeignKeyConstraint(['businessId'], ['businesses.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('users')
    op.drop_table('businesses')
    # ### end Alembic commands ###