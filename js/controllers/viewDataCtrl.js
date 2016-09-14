w3App.controller("viewDataCtrl", function ($scope, $http, $routeParams, $window) {
    var markers = [];
    var itemName = $routeParams.menuName;

    $scope.fetchData = [];
    $http({
        method: 'GET',
        url: '/search?location=london&term=' + itemName + ''
    }).then(function successCallback(response) {
        var data = response.data;
        $scope.fetchData = data;
        loadGoogleMarkers();
    }, function errorCallback(response) {
    });

    loadGoogleMarkers();
    $scope.gotoMarker = function (event) {
        var id = event.currentTarget.id;
        for (var i = 0; i < markers.length; i++) {
            var marker = markers[i];
            if (marker.id === id) {
                $(marker).click();
            }
        }
    };

    $scope.gotoBusiness = function (url) {
        $window.open(url, '_blank');
    }

    function loadGoogleMarkers() {
        var locations = $scope.fetchData;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: new google.maps.LatLng(-33.92, 151.25),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

        var marker, i;

        for (i = 0; i < locations.length; i++) {
            var coords = locations[i].cords;
            marker = new google.maps.Marker({
                id: locations[i].id,
                position: new google.maps.LatLng(coords.lat, coords.lon),
                map: map
            });

            markers.push(marker);

            bounds.extend(marker.position);

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent('<div><strong>' + locations[i].name + '</strong>' +
                        '<br>' + locations[i].address + '<br>' + locations[i].phone + '<br></div>');
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }

        map.fitBounds(bounds);
    }
});
