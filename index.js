const params = {};
let map;
let mapOptions = {};
const apiKey = "AIzaSyATDmwx76223-3qe973E3DlNmAOVnYixzQ";
$(function () {

    params.search = $("#search-input"); //use val function to get the value

})
let favorites = {};


function fs() {
    document.getElementById("myimage").webkitRequestFullscreen();

}

function addFavorite() {
    AjaxGeocode(function (respo) {
        let lng = respo.results[0].geometry.location.lng;
        let lat = respo.results[0].geometry.location.lat;
        let currentMarker = new google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: params.search.val()
        });

        favorites[params.search.val()] = currentMarker;
        let btn = document.createElement("BUTTON");
        btn.classList.add("btn", "btn-danger");
        let span = document.createElement("SPAN");
        span.innerText = "X";
        btn.appendChild(span);
        btn.innerText = params.search.val();

        btn.addEventListener("click", function () {
            let marker = favorites[$(this).text()];
            if (marker.map) {
                marker.setMap(null)
            }
            else {
                let lat = favorites["israel"].position.lat();
                let lng = favorites["israel"].position.lng();
                mapOptions.center = { lat, lng }
                marker.setMap(map)
            }

        })
        $("#tags").append(btn)
    });
}



function AjaxGeocode(callback) {

    $.ajax({
        method: "get",
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${params.search.val()}&key=${apiKey}`,
        success: function (response) {

            callback(response)
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    })

}

function set() { };



function getLocation() {



    AjaxGeocode(function (respo) {
        let lng = respo.results[0].geometry.location.lng;
        let lat = respo.results[0].geometry.location.lat;

        if (map == null) {
            let mapDOM = $("#currentMap")[0];
            mapOptions.center = new google.maps.LatLng(lat, lng);
            mapOptions.zoom = 8;
            map = new google.maps.Map(mapDOM, mapOptions);
            for (let marker in favorites) {
                favorites[marker].setMap(map);
            }
        } else {
            map.setCenter(new google.maps.LatLng(lat, lng));
        }

    });





    // navigator.geolocation.getCurrentPosition(function (location) {


    // var marker = new google.maps.Marker({
    //     position: { lat: 31.046051, lng: 34.851612 },
    //     map: map,
    //     title: 'john bryce!'
    // });

    // var marke2r = new google.maps.Marker({
    //     position: { lat, lng },
    //     map: map,
    //     title: 'john bryce!'
    // });

    // })

    // https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters

}

