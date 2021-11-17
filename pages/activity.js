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

window.resultView = new Vue({
  el: '#activity',
  data: {
    allTasks: [
      { description: "Do Leg Workout at IM Building", location: "ChIJfcTFNjauPIgRyB9rkIa_iEQ", points: 20 },
      { description: "Do Chest Workout at CCRB", location: "ChIJ06khDUOuPIgRpSjRFPKPV-Y", points: 20 },
      { description: "Go Jogging at Gallop Park", location: "ChIJERCql1CvPIgRklwPJbhyMsY", points: 20 }
    ],
    task1: 0,
    task2: 1,
    task3: 2,
    clickedTask: null, // what the user clicks on
    currentTask: null, // what the user is actually doing right now
    //map start
    map: null,
    infowindow: null, // to display activity location
    errorInfowindow: null, // to display error
    service: null,
    userImage: null,
    userMarker: null,
    activityMarker: null,
    placeId: null, // IM Building
    dstance: null,
    watchId: null,
    locationOn: false,
    // map2 for when user selected a currentTask
    map2: null,
  },
  methods: {
    // setTasks: function () {
    //   for (let i = 1; i < 50; i++) {
    //     this.allTasks.push(
    //       {
    //         description: "Go to CCRB" + i,
    //         location: "ChIJfcTFNjauPIgRyB9rkIa_iEQ",
    //         points: i
    //       }
    //     )
    //   }
    // },
    // getTasks: function () {
    //   let counter = 0;
    //   while (counter < 3) {
    //     let num = Math.floor(Math.random() * 51);
    //     if (counter == 0) {
    //       this.task1 = num;
    //       counter++;
    //     } else if (counter == 1) {
    //       if (this.task1 == num) {
    //         console.log("")
    //       } else {
    //         this.task2 = num;
    //         counter++;
    //       }
    //     } else if (counter == 2) {
    //       if (this.task1 == num || this.task2 == num) {
    //         console.log("");
    //       } else {
    //         this.task3 = num;
    //         counter++
    //       }
    //     }
    //   }
    // },
    acceptChallenge: function () {
      this.closeWindow()
      // set current task
      this.currentTask = this.clickedTask;
      // clear
      this.clickedTask = null;
      // TODO START HERE
      // Add new map for the functionality of user accepting the challenge
    },

    searchMap: function (index) {
      // update placeID
      this.placeId = this.allTasks[index].location;
      // select task
      this.clickedTask = index;
      // shows the activity marker on map
      this.showActivity();
      // shows the user marker on map
      this.showUser();
    },

    // MAP METHODS BELOW
    initMap: function () {
      // center the map at Ann Arbor
      const ann_arbor = new google.maps.LatLng(42.2808, -83.7430);
      // create map obj
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: ann_arbor,
        zoom: 13,
      });
      // create infowindow to display info about the location of activity
      this.infowindow = new google.maps.InfoWindow();
      this.errorInfowindow = new google.maps.InfoWindow({
        position: this.map.getCenter(),
        content: "Error: The request to get user location timed out.",
        //icon: this.userImage
      });
      // get the location of activity
      //this.showActivity();
      //this.showUser();
    },

    showUser: function () {
      // user image
      // this.userImage = {
      //   url: "a-better-tomorrow.jpg", // url TODO: CHANGE THIS
      //   scaledSize: new google.maps.Size(30, 30), // scaled size
      //   //origin: new google.maps.Point(0,0), // origin
      //   //anchor: new google.maps.Point(0, 0) // anchor
      // };
      // track user position
      // check if geolocation is supported
      if (navigator.geolocation) {
        this.watchId = navigator.geolocation.watchPosition(
          (position) => { // on success
            // close error window
            this.errorInfowindow.close();
            // user turned on location
            this.locationOn = true;
            const pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            // automatically updates user's location
            this.updateUserMarker(pos, this.destination);
          },
          this.showError, // on error
          { // additional settings
            enableHighAccuracy: true,
            timeout: 8000, // wait a max of 8 seconds for user's location
            maximumAge: 0
          }
        );
      }
      else {
        // Browser doesn't support Geolocation
        alert("Error: Your browser doesn't support geolocation.");
      }
    },

    updateUserMarker: function (user_pos, dest_pos) {
      console.log("update position");
      // if first time setting user position not set
      if (!this.userMarker) {
        // initialize marker for user
        this.userMarker = new google.maps.Marker({
          map: this.map,
          position: user_pos,
          title: "You",
          //icon: this.userImage TODO
        });
        // refocus map, but only for first time
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(this.activityMarker.position);
        bounds.extend(this.userMarker.position);
        this.map.fitBounds(bounds);
      }
      else {
        // update user's position on map
        this.userMarker.setPosition(user_pos);
      }
      // returns distance between user and destination in MILES
      this.distance = google.maps.geometry.spherical.computeDistanceBetween(user_pos, dest_pos) / 1609;
    },

    showActivity: function () {
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
          this.createActivityMarker(result);
          this.destination = result.geometry.location;
        }
      });
    },

    createActivityMarker: function (place) {
      if (!place.geometry || !place.geometry.location) return;
      // create activity marker
      this.activityMarker = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
        animation: google.maps.Animation.DROP,
        title: "Activity",
      });
      // recompute distance between user and activity
      // refocus map
      this.map.setCenter(place.geometry.location);
      // add a listener for this activity
      google.maps.event.addListener(this.activityMarker, "click", () => {
        this.infowindow.setContent(
          `<b>
          ${place.name}
          </b>
          <div>
            ${place.formatted_address}
          </div>
          <div>
            ${this.distance ? this.distance.toFixed(2) + " mi away" : ''}
          </div>
          <div>
            <a href=${place.website} target="_blank"> Website </a>
          </div>
          <div>
            <a href=${place.url} target="_blank"> Get Directions </a>
          </div>
          <div>
            <img src=${place.photos[0].getUrl({maxWidth: 250, maxHeight: 250})} alt="image" />
          </div>
          `
        );
        this.infowindow.open({
          anchor: this.activityMarker,
          map: this.map,
          shouldFocus: false,
        });
      });
    },

    closeWindow: function () {
      // clear location
      this.locationOn = false;
      // close info windows
      this.infowindow.close();
      // clear listener
      google.maps.event.clearInstanceListeners(this.activityMarker);
      // clear activity marker
      this.activityMarker.setMap(null);
      this.activityMarker = null;
      // stop tracking user
      navigator.geolocation.clearWatch(this.watchId);
      // clear user marker
      this.userMarker.setMap(null);
      this.userMarker = null;
    },

    showError: function (error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          this.locationOn = false;
          alert("Error: You denied the request for Geolocation.\n"
          + "For full functionality, please turn on location.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Error: Location information is unavailable.");
          break;
        case error.TIMEOUT:
          if (this.userMarker) {
            this.errorInfowindow.setPosition(this.userMarker.getPosition());
          }
          this.errorInfowindow.open(this.map);
          break;
        case error.UNKNOWN_ERROR:
          console.log("Error: An unknown error occurred.");
          break;
      }
    },
  }
})

//resultView.setTasks();

