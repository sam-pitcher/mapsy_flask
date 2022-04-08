# mapsy_flask

Storing routes as rows of coordinates can be heavy on a front end that you return them in. For example, a route could have 10,000 coordinates along it, if you store these each in a row, a tool like Looker will not be able to render the whole route with the 5000 max row limit. Let alone more than one route, for something like a heat map.

So enter the Polyline. A <a href="https://developers.google.com/maps/documentation/utilities/polylinealgorithm">Polyline</a> is an encoded string, that you can decode into an array of coordinates. Storing routes as Polylines in your database and handling them behind the browser (ie not rendering each coordinate) can allow you to display intricate heat maps. You can then use <a href="https://leafletjs.com/">Leaflet</a> to decode your String into an array of coordinates to display your routes.

Here is a small flask application that demonstrates the use of leaflet to show a heatmap from a sample of Strava data.

This is the basis for the mapsy page on the full <a href="http://strava-gcp.ew.r.appspot.com/mapsy">Strava-GCP application</a> on the mapsy page. If you don't have a Strava account for your own data, you can use:
- Username: demouser
- Password: demopass

![image](https://user-images.githubusercontent.com/45974014/162413073-357ed36c-dfca-4d58-97fa-b201aee02e3f.png)
