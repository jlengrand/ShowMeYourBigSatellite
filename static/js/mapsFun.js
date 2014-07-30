var map;
var satMarker;
var myLatLng;

function initialize() {
      var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(60, 16),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById('map-canvas'),  mapOptions);
};

var image = 'images/satellite_64.png';
myLatLng = new google.maps.LatLng(60, 16);
satMarker = new google.maps.Marker({
  position: myLatLng,
  map: map,
  icon: image
});

google.maps.event.addDomListener(window, 'load', initialize);

