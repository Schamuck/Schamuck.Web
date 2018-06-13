define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LiveTracker {
        constructor() {
            this.lat = 48.23554018035925;
            this.long = 7.01935091053534;
            this.showMap();
            setInterval(() => {
                this.lat = this.lat + 0.0001;
                this.long = this.long + 0.0001;
                this.showMap();
            }, 4000);
        }
        showMap() {
            var myOptions = {
                zoom: 13,
                center: new google.maps.LatLng(this.lat, this.long),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
            };
            let map = new google.maps.Map(document.getElementById("root"), myOptions);
            var data = `GirlFriend Position Latitude: ` + this.lat + ` longitude: ` + this.long;
            var infowindow = new google.maps.InfoWindow({
                content: data
            });
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.lat, this.long),
                title: "personId",
                map: map
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
        }
    }
    exports.LiveTracker = LiveTracker;
});
