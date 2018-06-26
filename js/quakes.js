const mapboxToken = "pk.eyJ1IjoiZnJpbWZyYW0iLCJhIjoiY2ppZHZibTVhMDI2bTNrbXFoZHN1MW52bCJ9.I4S1IB2asKd6RaeM5awS4Q";

// perform an API call to USGS to get 4.5+ quake info for past 30 days. 
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", createMarkers);

function createMarkers(response) {
    // access features in the data so we can loop through it
    var events = response.features
    console.log(events);
  
    // initialize an array to hold quakes
    var quakes = [];

    function markerSize(magnitude) {
      return magnitude*20000;
    }

    function getColor(magnitude) {
      if(magnitude <= 4.5){
        return "green"
      }
      if(magnitude <= 4.75){
        return "yellow"
      }
      else{
        return "red"
      }
    }

    // loop through 
    for (var i = 0; i < events.length; i++) {

      var coord = [events[i].geometry.coordinates[1], events[i].geometry.coordinates[0]];
      //coord = parseFloat(coord);
      var name = events[i].properties.place;
      var magnitude = events[i].properties.mag;
      //magnitude = parseFloat(magnitude);
      //if (typeof coord, name, magnitude !== 'null');

      //quakes = parseFloat(quakes)

      console.log(coord)
      console.log(name)
      console.log(magnitude)


      
      
      // for each quake, create a marker and bind a popup with the location's name & mag

      // add the marker to the quakes array
      quakes.push(
        L.circle(coord, {
          stroke: false,
          fillOpacity: magnitude/10,
          color: "purple",
          fillColor: getColor(magnitude),
          radius: markerSize(magnitude)
        }).bindPopup("<h3>" + name + "<h3><h3>Magnitude: " + magnitude + "<h3>")
      );
      

      var quakeLayer = L.layerGroup(quakes);
    }


    

    var earth = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		accessToken: mapboxToken,
		id: 'mapbox.light',
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	});

    var baseMaps = {
        "Light map": earth
      };

    var overlayMaps = {
        "Earthquake Locations": quakeLayer
      };

    var map = L.map("map-id", {
        center: [50, -0],
        zoom: 2,
        layers: [earth,quakeLayer]
      });
    
    L.control.layers(baseMaps, overlayMaps).addTo(map);

  
    }