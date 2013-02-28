$(document).ready(function() { 
  // replace "toner" here with "terrain" or "watercolor"
  var layer = new L.StamenTileLayer("watercolor");
  var map = new L.Map("map", {
      center: new L.LatLng(50.67074, -120.3560),
      zoom: 1
  });
  map.addLayer(layer);

  data = { 
    markers: [
      {
          "lat": 50.674522,
          "lng": -120.3272674,
          "location": "Kamloops, BC",
          "type": "Home"
      },
      {
          "lat": 44.2311717,
          "lng": -76.4859544,
          "location": "Kingston, ON",
          "type": "Home"
      },
      {
          "lat": 45.4215296,
          "lng": -75.69719309999999,
          "location": "Ottawa, ON",
          "type": "Trip"
      },
      {
          "lat": 43.653226,
          "lng": -79.3831843,
          "location": "Toronto, ON",
          "type": "Trip"
      },
      {
          "lat": 45.5086699,
          "lng": -73.55399249999999,
          "location": "Montreal, QC",
          "type": "Trip"
      },
      {
          "lat": 40.7143528,
          "lng": -74.00597309999999,
          "location": "New York, NY",
          "type": "Trip"
      },
      {
          "lat": 42.3584308,
          "lng": -71.0597732,
          "location": "Boston, MA ",
          "type": "Trip"
      },
      {
          "lat": 41.7839847,
          "lng": -71.4186603,
          "location": "Rhode Island, RH",
          "type": "Trip"
      },
      {
          "lat": 41.6032207,
          "lng": -73.087749,
          "location": "Connecticut, CT",
          "type": "Trip"
      },
      {
          "lat": 43.16103,
          "lng": -77.6109219,
          "location": "Rochester, NY",
          "type": "Trip"
      },
      {
          "lat": 38.8951118,
          "lng": -77.0363658,
          "location": "Washington, DC",
          "type": "Trip"
      },
      {
          "lat": 43.0895577,
          "lng": -79.0849436,
          "location": "Niagara Falls, ON",
          "type": "Trip"
      },
      {
          "lat": 44.6,
          "lng": -79.4166667,
          "location": "Orillia, ON",
          "type": "Trip"
      },
      {
          "lat": 44.50076869999999,
          "lng": -80.2169047,
          "location": "Collingwood, ON",
          "type": "Trip"
      },
      {
          "lat": 51.5170986,
          "lng": -0.1460838,
          "location": "London, UK",
          "type": "Trip"
      },
      {
          "lat": 50.572022,
          "lng": -3.9211201,
          "location": "Dartmoor, UK",
          "type": "Trip"
      },
      {
          "lat": 53.544389,
          "lng": -113.4909267,
          "location": "Edmonton, AB",
          "type": "Trip"
      },
      {
          "lat": 49.1665898,
          "lng": -123.133569,
          "location": "Richmond, BC",
          "type": "Home"
      }
    ]
  };

  var blackIcon = L.icon({
    iconUrl: 'static/img/black_marker.png',
    iconSize:      [16, 26],
    iconAnchor:    [8, 25],
    popupAnchor:   [20,30],
  });
  var blueIcon = L.icon({
    iconUrl: 'static/img/blue_marker.png',
    shadowUrl: 'static/img/shadow.png',
    iconSize:      [32, 37],
    iconAnchor:    [16, 35],
    //popupAnchor:   [20,30],
  });

  $.each(data.markers, function(index, value) {
    icon = blackIcon;
    if (value.type === 'Home') {
      icon = blackIcon;
    }
    else if (value.type === 'Trip') {
      icon = blueIcon;
    }
    L.marker([value.lat, value.lng], {icon: icon}).addTo(map)
      .bindPopup('<h3>' + value.location + '</h3>Easily customizable.');
      //.openPopup();
  });








  //to offset interal links from navbar
  function detectHash() {
    function maybeScrollToHash() {
      if (window.location.hash && $(window.location.hash).length) {
        var newTop = $(window.location.hash).offset().top - $('.navbar-fixed-top').height();
        $(window).scrollTop(newTop);
      }
    }

    $(window).bind('hashchange', function() {
      maybeScrollToHash();
    });

    maybeScrollToHash();
  }

  detectHash();
  
});