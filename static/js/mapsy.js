const container = document.getElementById('mapid')
if(container) {
    var colours = {
        'Run': 'yellow',
        'Ride': 'pink',
        'vtt': 'orange',
        'Swim': 'darkblue',
        'Walk': 'green',
        'AlpineSki': '#33A8FF',
        'Snowboard': '#33A8FF',
        'NordicSki': 'lightblue',
        'Workout': 'white',
        'VirtualRide': 'purple'
    };
    var map = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer.provider('CartoDB.DarkMatter').addTo(map);

    // var encodedRoutes = {{ routes|safe }} - to use server side data (from python)

    var request = new XMLHttpRequest();
    request.open("GET", "../static/data/data.json", false);
    request.send(null)
    var encodedRoutes = JSON.parse(request.responseText);
    console.log(encodedRoutes)

//         var encodedRoutes = [
//         {
//     "activities.activity_type": "AlpineSki",
//     "activities.polyline": "qbswGi{gi@z{D}nBkBpBaMeKuCfFsGnAuMwKg@lIcBpD{KxEgNgAiC|LeHKyNgJiQ{AG_FjaAqr@nCp@uBhOsRfRwKaIkHhFsVaQxBzSaB|DhArGcChEc@mBfCgDjbAin@uBlMaSfSgLwHgMpBwEqGH_BcKwCxAbQ_BnD~ArJaD~Jl~BsHmAzAkC{FcIuEy@Fq@zGeErAwGgA}DgFaLfLsFhA{B`IcEdDeJaGvAj@`AnEgCj^fAzJg@`PhCxAfHyDxD~FvF`@gFnNsLrCQlEhIf@wF`F_BrI_CsuAmCdDiDhNoBqDsFnCmUwInh@qNuTsOsAmEiHoHcJo@z}BmER~AoDLoBcFuHwDaBzGsNWwIyIc@lImB~DkF`C{@_AkB|BgPaCuB~JaDh@mYeMuMc@gCkDgA_J_EcI_G{CaFnBcDwBaApAp@tf@{BrX_CpOwDlD{ExVuApYmF`Ky@a@b_A{|BcF{V{JqHoD~A}EuCsBrD`Al^q@bh@iAfIwG|GoG|Wc@vQaAtB~@iHi@z@hcBejAsN{MaTaCk@mB|bAwr@dBz@}CdOyPnO_LgIgJjC{TiPxBtc@cBzDoDgA}H_WmJiGkFtAkCgDaAv@{@dDx@d_@aBbGaDze@eKv_@iAdY"
// }
//         ]

    var min_coords = { lat: 999999, lng: 999999 }
    var max_coords = { lat: -999999, lng: -999999 }

    for (let encoded of encodedRoutes) {
        console.log(min_coords)
        console.log(max_coords)
        var coordinates = L.Polyline.fromEncoded(encoded['activities.polyline']).getLatLngs();
        console.log(coordinates)

        L.polyline(
            coordinates,
            {
                // color: '#09E4BF',
                color: colours[encoded['activities.activity_type']],
                weight: 1,
                opacity: .5,
                lineJoin: 'round'
            }
        ).addTo(map);


        var lat = coordinates.map(function (p) { return p.lat });
        var lng = coordinates.map(function (p) { return p.lng });

        if (Math.min.apply(null, lat) < min_coords['lat']) {
            min_coords['lat'] = Math.min.apply(null, lat)
        }

        if (Math.min.apply(null, lng) < min_coords['lng']) {
            min_coords['lng'] = Math.min.apply(null, lng)
        }

        if (Math.max.apply(null, lat) > min_coords['lat']) {
            max_coords['lat'] = Math.max.apply(null, lat)
        }

        if (Math.max.apply(null, lng) > min_coords['lng']) {
            max_coords['lng'] = Math.max.apply(null, lng)
        }


    }

    var bounds = new L.LatLngBounds(max_coords, min_coords);
    map.fitBounds(bounds, { padding: [2, 2] });
};