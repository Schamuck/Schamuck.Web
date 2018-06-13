/// <reference path="../../typings/typings.d.ts"/>
 export class LiveTracker
{
  private lat =48.23554018035925;
  private long=7.01935091053534 ; 
    constructor() 
    {
      this.showMap();
      setInterval(()=> 
      {
        this.lat = this.lat +0.0001;
        this.long = this.long +0.0001;
        this.showMap();
      }, 
      4000);
    }

    private showMap()
    {
         var myOptions = 
          {
            zoom: 13,
            center: new google.maps.LatLng(this.lat, this.long),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
          }

        let map = new google.maps.Map(document.getElementById("root"), myOptions);

        var data = `GirlFriend Position Latitude: `+this.lat +` longitude: `+this.long;
        var infowindow = new google.maps.InfoWindow(
          {
          content: data
        });

      var marker = new google.maps.Marker(
        {
             
              position: new google.maps.LatLng(this.lat ,this.long),
              title: "personId",
              map:map
        }); 
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });
 
    }
}