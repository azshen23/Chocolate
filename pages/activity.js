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
    // another map for when user selected a currentTask
    currentTaskMap: null,
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
      // Add new map for the functionality of user accepting the challenge
      this.showActivity(this.currentTaskMap);
    },

    searchMap: function (index) {
      // user selected a task; note MUST BE NOT NULL
      if (this.currentTask !== null) {
        return;
      }
      // update placeID
      this.placeId = this.allTasks[index].location;
      // select task
      this.clickedTask = index;
      // shows the activity marker on map
      this.showActivity(this.map);
      // moved showUser within showActivity, due to async
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
        content: "Error: The request to get user location timed out.",
      });
      // create another map obj for later, when user selects a task
      this.currentTaskMap = new google.maps.Map(document.getElementById("map2"), {
        center: ann_arbor,
        zoom: 13,
      });
    },

    refocusMap: function(whichMap) {
      console.log(whichMap);
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(this.activityMarker.position);
      bounds.extend(this.userMarker.position);
      whichMap.fitBounds(bounds);
    },

    showUser: function (whichMap) {
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
            this.updateUserMarker(pos, this.destination, whichMap);
          },
          () => this.showError(whichMap), // on error
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

    updateUserMarker: function (user_pos, dest_pos, whichMap) {
      console.log("update position");
      // if first time setting user position not set
      if (!this.userMarker) {
        // initialize marker for user
        this.userMarker = new google.maps.Marker({
          map: whichMap,
          position: user_pos,
          title: "You",
          //icon: this.userImage TODO
        });
        // refocus map, but only for first time getting user position
        // use setTimeout to guarantee Bootstrap to change the visibility of map first
        setTimeout(() => this.refocusMap(whichMap), 500);
      }
      else {
        // update user's position on map
        this.userMarker.setPosition(user_pos);
      }
      // set distance between user and destination in MILES
      this.distance = google.maps.geometry.spherical.computeDistanceBetween(user_pos, dest_pos) / 1609;
    },

    showActivity: function (whichMap) {
      // create request to info about location of activity
      const request = {
        //placeId: 'ChIJ06khDUOuPIgRpSjRFPKPV-Y', // CCRB TODO: CHANGE THIS
        placeId: this.placeId,
      };
      // get location of activity
      this.service = new google.maps.places.PlacesService(whichMap);
      this.service.getDetails(request, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && result) {
          console.log(result);
          this.createActivityMarker(result, whichMap);
          this.destination = result.geometry.location;
          // after activity is fetched, now show user on map
          this.showUser(whichMap);
        }
        else {
          alert("Failed to fetch activity location, please reload page to try again.");
        }
      });
    },

    createActivityMarker: function (place, whichMap) {
      if (!place.geometry || !place.geometry.location) return;
      // create activity marker
      this.activityMarker = new google.maps.Marker({
        map: whichMap,
        position: place.geometry.location,
        animation: google.maps.Animation.DROP,
        title: "Activity",
      });
      // recompute distance between user and activity
      // refocus map
      whichMap.setCenter(place.geometry.location);
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
          map: whichMap,
          shouldFocus: false,
        });
      });
    },

    closeWindow: function () {
      // clear location
      // this.locationOn = false;
      // close info windows
      this.infowindow.close();
      if (this.activityMarker) {
        // clear listener
        google.maps.event.clearInstanceListeners(this.activityMarker);
        // clear activity marker
        this.activityMarker.setMap(null);
        this.activityMarker = null;
      }
      // stop tracking user
      navigator.geolocation.clearWatch(this.watchId);
      if (this.userMarker) {
        // clear user marker
        this.userMarker.setMap(null);
        this.userMarker = null;
      }
    },

    showError: function (error, whichMap) {
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
          else {
            this.errorInfowindow.setPosition(whichMap.getCenter());
          }
          this.errorInfowindow.open(whichMap);
          break;
        case error.UNKNOWN_ERROR:
          console.log("Error: An unknown error occurred.");
          break;
      }
    },
  }
})

//resultView.setTasks();

