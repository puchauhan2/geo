//Angular App Module and Controller
var sampleApp = angular.module('mapsApp', []);
sampleApp.controller('MapCtrl', function($scope) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/fetch",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "token": "specktronbrainviresignaling",
            "cache-control": "no-cache",
            "postman-token": "2b63abbd-adcb-0164-ad1c-7515bceaee50"
        }
    }
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    var flag = true;
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    $.ajax(settings).done(function(response) {
        var cities = response.data;
        for (i = 0; i < cities.length; i++) {
            createMarker(cities[i]);
        }
    });
    var createMarker = function(info) {
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.name
        });

        marker.content = '<div class="infoWindowContent">' + info.city + '</div>';
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);
    }

    $scope.openInfoWindow = function(e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

    $scope.myFunc = function() {
        var data = {
            lat: $("#lat").val(),
            long: $("#long").val()
        };
        

        $.post("/check", data, function(value, status) {
            console.log(value, status);
            if (status == "success") {
                clearMarkers();
                setTimeout(function(){
                  createMarker(data);
                  createMarker(value.result[0]);
                }, 1000);
            } else {
                console.log("FAIL");
            }
        });
    };
    // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < $scope.markers.length; i++) {
          $scope.markers[i].setMap(map);
        }
        $scope.markers = [];
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }
});