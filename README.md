# Boatey

Deployed at https://boatey.herokuapp.com/ 

Front end built with create-react-app, deployed on Heroku.  Node.js back end, also deployed on Heroku.

A website to help boaters plan boating trips.  There are two main features:  First, a weather app that tells the current day's weather on the top of each page, as well as a 16 day weather forecast.  Second, a "trip planner" that lists all on-water points of interest near the user's location or a location of their choosing.  Users can view (and rate if logged in) the various points of interest, and create trips from point to point.  The site will log the path of the trip and the distance, and store it in the database so it can be viewed, and also rated by its creator.

All users are able to use all weather functionality.  Unregistered users may view points of interest and trips recently saved by other users.  Must register and be logged in to create and save your own trip, or to rate points of interest or trips.

Local storage is used to remember a user's selected location (if it is not the same location they are registered from), as well as the path of the trip a logged in user has started planning without saving to the database.

Test files are in __tests __ folder.  Run with NPM test.

Multiple APIs are in use.  weatherbit.io API is used for all weather related information.  marinas.com API is used for points of interest.  React-mapbox-gl along with mapbox-gl-js are used for showing points of interest on maps, as well as calculating distance between points.

There is also a boatey-backend database hosted at https://boatey-backend.herokuapp.com/.  This stores all back end information for Boatey.  Tables include users (user credentials, location, and preferred units of measurement), locations (name and latitude/longitude of points of interest that have been included in a saved trip or rated by a user), location_ratings (each rating for a location and the user who rated it), trips (name and distance of a saved trip), trip_locations (IDs of each location and the trip it is visited in, and the order it appears in that trip), and user_trips (trip ID, user who created the trip, and the rating that user gave to the trip, if any).  Back end files are at https://github.com/bpruitt63/capstone2-backend