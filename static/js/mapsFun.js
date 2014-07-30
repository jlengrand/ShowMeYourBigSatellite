var map;
var satMarker;
var myLatLng;

function initializeGoogle() {

    var centerStart = new google.maps.LatLng(60, 16);

    var mapOptions = {
        zoom: 6,
        center: centerStart,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById('map-canvas'),  mapOptions);

    var image = 'images/satellite_64.png';
    satMarker = new google.maps.Marker({
        position: centerStart,
        map: map,
        icon: image
    });
};

// Gets the latest satellite position from the server
function getPosition(){
        $.getJSON("http://localhost:5000/get_coordinates",function(result){
        var pos = new google.maps.LatLng(result.latitude, result.longitude);
        satMarker.setPosition(pos);
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
    initializeGoogle();

    //Starts looping over the positions
    loopPosition(1);
});