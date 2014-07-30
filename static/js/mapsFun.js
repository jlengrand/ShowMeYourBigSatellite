var map;
var satMarker;
var myLatLng;
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
  }
}
}
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(60, 16),
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
map = new google.maps.Map(document.getElementById('map-canvas'),
  mapOptions);

var image = 'images/satellite_64.png';
myLatLng = new google.maps.LatLng(60, 16);
satMarker = new google.maps.Marker({
  position: myLatLng,
  map: map,
  icon: image
});

google.maps.event.addListener(map, 'center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function() {
      map.panTo(satMarker.getPosition());
  }, 10000);
});

google.maps.event.addListener(satMarker, 'click', function(myNewLatLng) {
    window.setTimeout(function() {
       //alert("event");
       //var myNewLatLng = new google.maps.LatLng(satMarker.getPosition().lat()+1, satMarker.getPosition().lon()+1 );
       //
       satMarker.setPosition(myNewLatLng);
   },0);
});

//    google.maps.event.addListener(timer, 'changed', function() {
//    // 3 seconds after the center of the map has changed, pan back to the
//    // marker.
//    window.setTimeout(function() {
//      map.panTo(satMarker.getPosition());
//    },0);
//  });


}

function uptadePosition() {
    //alert("event");
    var myNewLatLng = new google.maps.LatLng(61, 17);
    google.maps.event.trigger(satMarker, 'click', myNewLatLng);
    $.ajax({
      type: "POST",
      url: "pythoncode.py",
      data: { param: text}
  }).done(function( o ) {
   // do something
});
}


google.maps.event.addDomListener(window, 'load', initialize);
setInterval(uptadePosition, 5000);

