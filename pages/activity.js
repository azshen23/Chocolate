// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js";
// import { getAuth} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
// import "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

// const firebaseConfig = {
// apiKey: "AIzaSyBcDXz7O-3FkG2uCgTGWXY7Ay4aMyXE3N8",
// authDomain: "chocolate-2c71d.firebaseapp.com",
// projectId: "chocolate-2c71d",
// storageBucket: "chocolate-2c71d.appspot.com",
// messagingSenderId: "744292159993",
// appId: "1:744292159993:web:866b078a19b17b2d21ad28",
// measurementId: "G-3ZNXNEQ38Z"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth();

//if user is currently not logged in a session, they will be redirected to the log in page
//comment out for now since this well intefere with development of the page
/* onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  } else {
    location.href= 'login.html'
  }
}); */

var resultView = new Vue({
    el: '#activity',
    data: {
      allTasks: [{'description' : "Go to CCRB0", location: "xyz0", "points": "0"}, {'description' : "Go to CCRB0", location: "xyz0", "points": "0"}, {'description' : "Go to CCRB0", location: "xyz0", "points": "0"}],
      task1: 0,
      task2: 1,
      task3: 2,
      selectedTask: -1,
      //map start
      map: null,
      infowindow: null,
      service: null,
      userLocation: null,
      userImage: null,
      userMarker: null,
      activityLocation: null,
      actiityMarker: null,
      placeId: "ChIJfcTFNjauPIgRyB9rkIa_iEQ", // IM Building
    },
    methods: {
      setTasks: function() {
        for(let i = 1; i < 50; i++) {
          resultView.allTasks.push(
            {
              description: "Go to CCRB" + i,
              location: "ChIJfcTFNjauPIgRyB9rkIa_iEQ",
              points: i
            }
          )
        }
      },
      getTasks: function() {
        console.log("DAWD")
        console.log(resultView.task1);
        let counter = 0;
        while(counter < 3) {
          let num = Math.floor(Math.random() * 51);
          if(counter == 0) {
            resultView.task1 = num;
            counter++;
          } else if(counter == 1) {
            if(resultView.task1 == num) {
              console.log("")
            } else {
              resultView.task2 = num;
              counter++;
            }
          } else if(counter == 2) {
            if(resultView.task1 == num || resultView.task2 == num) {
              console.log("");
            } else {
              resultView.task3 = num;
              counter++
            }
          }
        }
      },
      searchMap: function(index) {
        console.log(location);
        console.log(this.allTasks[index]['location'])
        this.placeId = this.allTasks[index]['location'];
        this.showActivityOnMap();

      },
      initMap: function () {
        // center the map at Ann Arbor
        const ann_arbor = new google.maps.LatLng(42.2808, -83.7430);
        // create infowindow to display info about the location of activity
        this.infowindow = new google.maps.InfoWindow();
        // create map obj
        this.map = new google.maps.Map(document.getElementById("map"), {
          center: ann_arbor,
          zoom: 13,
        });
        // get the location of activity
        //this.showActivityOnMap();
        //this.showUser();
      },
  
      showUser: function () {
        // user image
        this.userImage = {
          url: "a-better-tomorrow.jpg", // url TODO: CHANGE THIS
          scaledSize: new google.maps.Size(30, 30), // scaled size
          //origin: new google.maps.Point(0,0), // origin
          //anchor: new google.maps.Point(0, 0) // anchor
        };
        // initial marker for user, default to ann arbor
        this.userMarker = new google.maps.Marker({
          map: this.map,
          position: { lat: 42.2808, lng: -83.7430 },
          title: "You",
          icon: this.userImage
        });
        // track user position
        // check if geolocation is supported
        if (navigator.geolocation) {
          // automatically updates user's location
          navigator.geolocation.watchPosition(
            (position) => {
              const pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              this.updateUser(pos, this.destination);
            },
            () => {
              //this.handleLocationError(true, infoWindow, map.getCenter());
              console.log("geolocation failed");
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            }
          );
        }
        // else {
        //   // Browser doesn't support Geolocation
        //   this.handleLocationError(false, infoWindow, map.getCenter());
        // }
      },
  
      updateUser: function (user_pos, dest_pos) {
        this.userMarker.setPosition(user_pos);
        // returns distance between user and destination in METERS
        return google.maps.geometry.spherical.computeDistanceBetween(user_pos, dest_pos);
      },
  
      // handleLocationError: function (browserHasGeolocation, infoWindow, pos) {
      //   infoWindow.setPosition(pos);
      //   infoWindow.setContent(
      //     browserHasGeolocation
      //       ? "Error: The Geolocation service failed."
      //       : "Error: Your browser doesn't support geolocation."
      //   );
      //   infoWindow.open(map);
      // },
  
      showActivityOnMap: function () {
        // create request to info about location of activity
        const request = {
          //placeId: 'ChIJ06khDUOuPIgRpSjRFPKPV-Y', // CCRB TODO: CHANGE THIS
          placeId: this.placeId,
        };
        // get location of activity
        this.service = new google.maps.places.PlacesService(this.map);
        this.service.getDetails(request, (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && result) {
            console.log(result);
            this.createMarker(result); 
            this.destination = result.geometry.location;
          }
        });
      },
  
      createMarker: function (place) {
        if (!place.geometry || !place.geometry.location) return;
  
        this.activityMarker = new google.maps.Marker({
          map: this.map,
          position: place.geometry.location,
          animation: google.maps.Animation.DROP,
          title: "Activity",
        });
  
        // refocus map
        if (place.geometry.viewport) {
          this.map.fitBounds(place.geometry.viewport);
        } else {
          this.map.setCenter(place.geometry.location);
        }
        
        google.maps.event.addListener(this.activityMarker, "click", () => {
          this.infowindow.setContent(
            `<b>
            ${place.name}
            </b>
            <div>
              ${place.formatted_address}
            </div>
            <div>
              <a href=${place.website} target="_blank"> View Website </a>
            </div>
            <div>
              <a href=${place.url} target="_blank"> Open in Google Maps </a>
            </div>
            <div>
              <img src=${place.photos[0].getUrl({maxWidth: 200, maxHeight: 200})} alt="image" />
            </div>
            `
          );
          this.infowindow.open({
            anchor: this.activityMarker,
            map: this.map,
            shouldFocus: false,
          });
        });
      }
    }
})

resultView.setTasks();