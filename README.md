# Review-a-Loo - The Highway Bathroom Cleanliness Review App
Everybody wants it. Everybody needs it. It's finally here! The app to review bathroom cleanliness. Now everyone can be like George Castanza and find the right throne to park at.

## MVP
* User Registration
* Search Restrooms by Location
* Map Display for Nearby Restrooms
* Business Profile Page
* Add/Edit/Delete Reviews

## BONUS STRETCH GOALS
* Upvote Reviews
* Create a Roadtrip Map
* Create a SideScroller called ToiletTime

## TECHNOLOGY USED
### Client Side
* React
* Google Maps Api
* Chakra Component Library

### Server Side
* Flask / Python Server
* Postgres Database
* SQLAlchemy / Alembic
* Yelp Fusion API
* AWS S3 Storage

## DATABASE TABLES
### USERS
* id (integer, primary key)
* username (string, not null)
* email (string, not null, unique)
* hashed_password (string, not null)

### REVIEWS
* id (integer, primary key)
* stars(integer, not null)
* businessId(integer, foreign key)
* content (string, not null)
* userId (integer, foreign key)
* image (string, nullable)

### BUSINESSES
* id(integer, primary key)
* yelpId (integer, not null, unique)
* name (string, not null)
* imageUrl (string, nullable)
* category (string, nullable)
* latitude (numeric, not null)
* longitude (numeric, not null)
* address1 (string, not null)
* city (string, not null)
* phone (string, nullable)
* displayAddress (string, not null)
* yelpUrl (string, nullable)

