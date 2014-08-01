var map;
var satMarker;
var myLatLng;

function initializeMap() {

    var centerStart = new L.latLng(60, 16);

    var mapOptions = {
        zoom: 6,
        center: centerStart
    };

    map = new L.map('map',  mapOptions);

    // adds an OpenStreetMap tile layer
    var tileLayer = L.tileLayer('http://{s}.tiles.mapbox.com/v3/jlengrand.j49bad4d/{z}/{x}/{y}.png');

    map.addLayer(tileLayer);

    var image = 'images/satellite_64.png';
    satMarker = new L.Marker(centerStart);
    satMarker.addTo(map);
    //TODO: Custom marker


};

// Gets the latest satellite position from the server
function getPosition(){
        $.getJSON("http://localhost:5000/get_coordinates",function(result){
        var pos = new L.latLng(result.latitude, result.longitude);
        satMarker.setLatLng(pos);
        //FIXME: change
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