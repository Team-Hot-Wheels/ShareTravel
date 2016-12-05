function initMap() {

    var originPlaceId = null;
    var destinationPlaceId = null;
    var travelMode = 'DRIVING';
    var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: { lat: 42.6900, lng: 25.3624 },
        zoom: 6
    });
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);

    var originInput = document.getElementById('from');
    var destinationInput = document.getElementById('to');

    var opts = {
        types: ['(cities)'],
        componentRestrictions: { country: 'bg' }
    };

    var originAutocomplete = new google.maps.places.Autocomplete(originInput, opts);
    originAutocomplete.bindTo('bounds', map);
    var destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput, opts);
    destinationAutocomplete.bindTo('bounds', map);

    function expandViewportToFitPlace(map, place) {
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
    }

    originAutocomplete.addListener('place_changed', function () {

        var place = originAutocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
        expandViewportToFitPlace(map, place);

        // If the place has a geometry, store its place ID and route if we have
        // the other place ID
        originPlaceId = place.place_id;
        route(originPlaceId, destinationPlaceId, travelMode,
            directionsService, directionsDisplay);
    });

    destinationAutocomplete.addListener('place_changed', function () {
        var place = destinationAutocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
        expandViewportToFitPlace(map, place);

        // If the place has a geometry, store its place ID and route if we have
        // the other place ID
        destinationPlaceId = place.place_id;
        route(originPlaceId, destinationPlaceId, travelMode,
            directionsService, directionsDisplay);
    });

    function route(originPlaceId, destinationPlaceId, travelMode,
        directionsService, directionsDisplay) {
        if (!originPlaceId || !destinationPlaceId) {
            return;
        }
        directionsService.route({
            origin: { 'placeId': originPlaceId },
            destination: { 'placeId': destinationPlaceId },
            travelMode: travelMode,
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
}