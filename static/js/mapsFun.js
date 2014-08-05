var map;
var satMarker;
var myLatLng;

function initializeMap() {

    var centerStart = new L.latLng(60, 16);

    var mapOptions = {
        zoom: 6,
        center: centerStart
    };

var satelliteIcon = L.icon({
    iconUrl: 'images/satellite_64.png',
    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
});

    map = new L.map('map',  mapOptions);

    // adds an OpenStreetMap tile layer
    var tileLayer = L.tileLayer('http://{s}.tiles.mapbox.com/v3/jlengrand.j49bad4d/{z}/{x}/{y}.png');

    map.addLayer(tileLayer);

    var image = 'images/satellite_64.png';
    satMarker = new L.Marker(centerStart, {icon: satelliteIcon});
    satMarker.addTo(map);


};

// Gets the latest satellite position from the server
function getPosition(){
        var urlBase = "http://localhost:5000/get_coordinates/"
        var satellite = $("#satellite").val();
        var url = urlBase + satellite;
        console.log(url);
        $.getJSON(url,function(result){
        var pos = new L.latLng(result.latitude, result.longitude);
        satMarker.setLatLng(pos);
        map.panTo(satMarker.getLatLng());

    });
}

// Loops over the coordinates every n seconds
function loopPosition(intervalSec){
    window.setInterval(function(){
        getPosition()
    }, intervalSec * 1000);
}

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){
    // Inits the map and the marker
    initializeMap();

    //Starts looping over the positions
    loopPosition(1);
});