function initMap() {

    var origin_place_id = null;
    var destination_place_id = null;
    var travel_mode = 'DRIVING';
    var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: { lat: 42.6900, lng: 25.3624 },
        zoom: 6
    });
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);

    var origin_input = document.getElementById('from');
    var destination_input = document.getElementById('to');

    var opts = {
        types: ['(cities)'],
        componentRestrictions: { country: 'bg' }
    };

    var origin_autocomplete = new google.maps.places.Autocomplete(origin_input, opts);
    origin_autocomplete.bindTo('bounds', map);
    var destination_autocomplete = new google.maps.places.Autocomplete(destination_input, opts);
    destination_autocomplete.bindTo('bounds', map);

    function expandViewportToFitPlace(map, place) {
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
    }

    origin_autocomplete.addListener('place_changed', function () {

        var place = origin_autocomplete.getPlace();
        console.log(place);
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
        expandViewportToFitPlace(map, place);

        // If the place has a geometry, store its place ID and route if we have
        // the other place ID
        origin_place_id = place.place_id;
        route(origin_place_id, destination_place_id, travel_mode,
            directionsService, directionsDisplay);
    });

    destination_autocomplete.addListener('place_changed', function () {
        var place = destination_autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }
        expandViewportToFitPlace(map, place);

        // If the place has a geometry, store its place ID and route if we have
        // the other place ID
        destination_place_id = place.place_id;
        route(origin_place_id, destination_place_id, travel_mode,
            directionsService, directionsDisplay);
    });

    function route(origin_place_id, destination_place_id, travel_mode,
        directionsService, directionsDisplay) {
        if (!origin_place_id || !destination_place_id) {
            return;
        }
        directionsService.route({
            origin: { 'placeId': origin_place_id },
            destination: { 'placeId': destination_place_id },
            travelMode: travel_mode
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
}