const params = {};
const apiKey = "AIzaSyATDmwx76223-3qe973E3DlNmAOVnYixzQ";
$(function () {

    params.search = $("#search-input"); //use val function to get the value

})

function getGeoCode() {
    AjaxGeocode();
}

function AjaxGeocode() {

    $.ajax({
        method: "get",
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${params.search.val()}&key=${apiKey}`,
        success: function (response) {
            console.log(response);
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    })

}



function getLocation() {

    let mapDOM = document.getElementById("currentMap");
    let mapOptions = {};


    navigator.geolocation.getCurrentPosition(function (location) {
        let lat = location.coords.latitude;
        let lng = location.coords.longitude;
        mapOptions.center = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        mapOptions.zoom = 8;
        let map = new google.maps.Map(mapDOM, mapOptions);

        var marker = new google.maps.Marker({
            position: { lat: 31.046051, lng: 34.851612 },
            map: map,
            title: 'john bryce!'
        });

        // var marke2r = new google.maps.Marker({
        //     position: { lat, lng },
        //     map: map,
        //     title: 'john bryce!'
        // });

    })

    // https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters

}

