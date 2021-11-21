import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth , onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcDXz7O-3FkG2uCgTGWXY7Ay4aMyXE3N8",
  authDomain: "chocolate-2c71d.firebaseapp.com",
  projectId: "chocolate-2c71d",
  storageBucket: "chocolate-2c71d.appspot.com",
  messagingSenderId: "744292159993",
  appId: "1:744292159993:web:866b078a19b17b2d21ad28",
  measurementId: "G-3ZNXNEQ38Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

//if user is currently not logged in a session, they will be redirected to the log in page
//comment out for now since this well intefere with development of the page
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  } else {
    location.href= 'index.html'
  }
});


// GTA San Andreas Mission Passed Theme
// https://www.youtube.com/watch?v=7lsdJDiJ0QE
//var mission_passed_sound = new Audio("../sound/Mission-passed.mp3");
// Undertale Soundtrack - Determination
// https://www.youtube.com/watch?v=h1wSPmlZV-w
var determination = new Audio("../sound/Determination.mp3");


// Motivational Speech for the user
// Credit: https://undertale.fandom.com/wiki/SAVE_Point
var motivation_quotes = [
  "Knowing the mouse might one day leave its hole and get the cheese... It fills you with determination.",
  "The cold atmosphere of a new land... it fills you with determination.",
  "Knowing the mouse might one day find a way to heat up the spaghetti... It fills you with determination.",
  "Snow can always be broken down and rebuilt into something more useful. This simple fact fills you with determination.",
  "Knowing that dog will never give up trying to make the perfect snowdog... It fills you with determination.",
  "The sight of such a friendly town fills you with determination.",
  "A feeling of dread hangs over you... But you stay determined.",
  "Knowing the mouse might one day extract the cheese from the mystical crystal... It fills you with determination.",
  "The serene sound of a distant music box... It fills you with determination.",
  "Partaking in useless garbage fills you with determination.",
  "You feel a calming tranquility. You're filled with determination...",
  "You feel... something. You're filled with determination.",
  "The wind is howling. You're filled with determination...",
  "The howling wind is now a breeze. This gives you determination...",
  "Seeing such a strange laboratory in a place like this... You're filled with determination.",
  "An ominous structure looms in the distance... You're filled with determination.",
  "Knowing the mouse might one day hack into the computerized safe and get the cheese... It fills you with determination.",
  "The relaxing atmosphere of Ann Arbor... it fills you with determination.",
  "The air is filled with the smell of carbon dioxide... it fills you with determination.",
  "Behind this door must be the path to Bursley Baits. You're filled with determination."
];

// display the motivational text, one character at a time
// type one text in the typwriter
// keeps calling itself until the text is finished
function typeWriter(text, i, ID, fnCallback) {
  // check if text isn't finished yet
  if (i < (text.length)) {
    // add next character to strong
    document.getElementById(ID).innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
    // wait for a while and call this function again for next character
    setTimeout(function () {
      typeWriter(text, i + 1, ID, fnCallback)
    }, 100);
  }
  // text finished, call callback if there is a callback function
  else if (typeof fnCallback == 'function') {
    // call callback after timeout
    setTimeout(fnCallback, 10000);
  }
}
// start a typewriter animation for a text in the dataText array
function StartTextAnimation(i, ID) {
  if (typeof motivation_quotes[i] == 'undefined') {
    setTimeout(function () {
      StartTextAnimation(0, ID);
    }, 10000);
  }
  // check if dataText[i] exists
  if (i < motivation_quotes[i].length) {
    // text exists! start typewriter animation
    typeWriter(motivation_quotes[i], 0, ID, function () {
      // after callback (and whole text has been animated), start next text
      StartTextAnimation(i + 1, ID);
    });
  }
}


window.resultView = new Vue({
  el: '#activity',
  data: {
    allTasks: [
      { description: "Do Leg Workout at IM Building", location: "ChIJfcTFNjauPIgRyB9rkIa_iEQ", points: 99 },
      { description: "Do Chest Workout at IM Building", location: "ChIJfcTFNjauPIgRyB9rkIa_iEQ", points: 99 },
      { description: "Do Back Workout at IM Building", location: "ChIJfcTFNjauPIgRyB9rkIa_iEQ", points: 99 },
      { description: "Run on the field near IM Building", location: "ChIJfcTFNjauPIgRyB9rkIa_iEQ", points: 99 },
      { description: "Play Basketball at IM Building", location: "ChIJfcTFNjauPIgRyB9rkIa_iEQ", points: 99 },
      //
      { description: "Play Tennis at Palmer Field", location: "ChIJhyLAjUKuPIgRNEVG1C1mLe4", points: 99 },
      { description: "Play Soccer at Palmer Field", location: "ChIJhyLAjUKuPIgRNEVG1C1mLe4", points: 99 },
      { description: "Play Basketball at Palmer Field", location: "ChIJhyLAjUKuPIgRNEVG1C1mLe4", points: 99 },
      { description: "Run Along Track at Palmer Field", location: "ChIJhyLAjUKuPIgRNEVG1C1mLe4", points: 99 },
      { description: "Play Ultimate Frisbee at Palmer Field", location: "ChIJhyLAjUKuPIgRNEVG1C1mLe4", points: 99 },
      //
      { description: "Go Jogging at Gallop Park", location: "ChIJERCql1CvPIgRklwPJbhyMsY", points: 99 },
      { description: "Go Jogging at Fuller Park", location: "ChIJdcRFoWWuPIgRD447SYGTkJw", points: 99 },
      { description: "Go Hiking at Bird Hills Nature Area", location: "ChIJpx8iS_6tPIgRSNEzjRsGJPI", points: 99 },
      { description: "Go Jogging at Bandemer Park", location: "ChIJqcFSmuGtPIgRHT2h_UQHXwE", points: 99 },
      { description: "Go Jogging at West Park", location: "ChIJmUmUpRiuPIgR1H8_Tc3aOgo", points: 99 },
      //
      { description: "Do Leg Workout at IM Building", location: "ChIJ06khDUOuPIgRpSjRFPKPV-Y", points: 99 },
      { description: "Do Chest Workout at IM Building", location: "ChIJ06khDUOuPIgRpSjRFPKPV-Y", points: 99 },
      { description: "Do Back Workout at IM Building", location: "ChIJ06khDUOuPIgRpSjRFPKPV-Y", points: 99 },
      { description: "Run on the field near IM Building", location: "ChIJ06khDUOuPIgRpSjRFPKPV-Y", points: 99 },
      { description: "Play Basketball at IM Building", location: "ChIJ06khDUOuPIgRpSjRFPKPV-Y", points: 99 },
      //
      { description: "Go Picnicking at Bandemer Park", location: "ChIJqcFSmuGtPIgRHT2h_UQHXwE", points: 99 },
      { description: "Go Hiking at Furstenberg Nature Area", location: "ChIJa88lL-2uPIgRbJO40cTmSyk", points: 99 },
      { description: "Go Jogging at County Farm Park", location: "ChIJWev0zBivPIgR2yVMyaMoaTI", points: 99 },
      { description: "Observe Nature at Nichols Arboretum", location: "ChIJAZAd-l2uPIgRiGn9BwszutQ", points: 99 },
      { description: "Go Take a Walk at The Diag", location: "ChIJQyjaRiqvPIgRLFzfxITsj7Q", points: 99 },
      //
      { description: "Have an Outdoor Picnic at Fuller Park", location: "ChIJdcRFoWWuPIgRD447SYGTkJw", points: 99 },
      { description: "Explore nature at Fuller Park", location: "ChIJdcRFoWWuPIgRD447SYGTkJw", points: 99 },
      { description: "Outdoor meditation at Bandemer Park", location: "ChIJqcFSmuGtPIgRHT2h_UQHXwE", points: 99 },
      { description: "Go Vist Michigan Stadium", location: "ChIJTd-grjOuPIgRrdNQzLYIANc", points: 99 },
      { description: "Go Vist the Museum of Natural History", location: "ChIJhy11v0OuPIgR33uMs6yLATo", points: 99 },
      //
      { description: "Go Vist the Museum of Art", location: "ChIJbbmqg0euPIgRzlnhZSj2z8g", points: 99 },
      { description: "Go Visit the Museum of Natural History", location: "ChIJhy11v0OuPIgR33uMs6yLATo", points: 99 },
      { description: "Play Golf at UofM Golf Course", location: "ChIJvfjVlMuvPIgR43RxgKMGHVU", points: 99 },
      { description: "Visit Matthaei Botanical Gardens", location: "ChIJR3mTeOSrPIgRF0CehvEp8Jg", points: 99 },
      { description: "Rock Climb at Planet Rock", location: "ChIJtXJtoQuxPIgRuF7yf1dAMsA", points: 99 },
      //
      { description: "Play Softball at Mitchell Field", location: "ChIJKYj1jmGuPIgRMPTVnTzVgwY", points: 99 },
      { description: "Play Football at Mitchell Field", location: "ChIJKYj1jmGuPIgRMPTVnTzVgwY", points: 99 },
      { description: "Play Soccer at Mitchell Field", location: "ChIJKYj1jmGuPIgRMPTVnTzVgwY", points: 99 },
      { description: "Outdoor Yoga at Mitchell Field", location: "ChIJKYj1jmGuPIgRMPTVnTzVgwY", points: 99 },
      { description: "Jog Along Trails at Matthaei Botanical Gardens", location: "ChIJR3mTeOSrPIgRF0CehvEp8Jg", points: 99 },
      //
      { description: "Observe Nature at Gallop Park", location: "ChIJERCql1CvPIgRklwPJbhyMsY", points: 99 },
      { description: "Clean Up Trash at Gallop Park", location: "ChIJERCql1CvPIgRklwPJbhyMsY", points: 99 },
      { description: "Jog Along Trails at Lillie Park", location: "ChIJT7PJY2CvPIgRv3n7r5fSqi0", points: 99 },
      { description: "Outdoor Yoga at Lillie Park", location: "ChIJT7PJY2CvPIgRv3n7r5fSqi0", points: 99 },
      { description: "Golf at Stonebridge Golf Club", location: "ChIJkTJkerO6PIgRwUnVaV_Hbcc", points: 99 },
      //
      { description: "Bike the Trails of Furstenberg Nature Area", location: "ChIJa88lL-2uPIgRbJO40cTmSyk", points: 99 },
      { description: "Walk Through Furstenberg Nature Area", location: "ChIJa88lL-2uPIgRbJO40cTmSyk", points: 99 },
      { description: "Walk to Farmers Market", location: "ChIJ-a_wdBauPIgRwd8hiA1d29k", points: 99 },
      { description: "Drop in Hockey at the Ice Cube", location: "ChIJxQUa3zmwPIgRJhizKNGdmOU", points: 99 },
      { description: "Go Ice-Skating at the Ice Cube", location: "ChIJxQUa3zmwPIgRJhizKNGdmOU", points: 99 },
    ],
    task1: 0,
    task2: 1,
    task3: 2,
    clickedTask: null, // what the user clicks on
    currentTask: null, // what the user is actually doing right now
    taskCompleted: [false, false, false], // indicates whether task is completed
    username: "zhaojer",
    //map start
    map: null,
    infowindow: null, // to display activity location
    errorInfowindow: null, // to display error
    service: null,
    userImage: null,
    userMarker: null,
    activityMarker: null,
    placeId: null, // IM Building
    distance: null,
    watchId: null,
    locationOn: false,
    // another map for when user selected a currentTask
    currentTaskMap: null,
  },
  methods: {
    getTasks: function () {
      let counter = 0;
      while (counter < 3) {
        let num = Math.floor(Math.random() * 50);
        if (counter == 0) {
          this.task1 = num;
          counter++;
        } else if (counter == 1) {
          if (this.task1 == num) {
            console.log("")
          } else {
            this.task2 = num;
            counter++;
          }
        } else if (counter == 2) {
          if (this.task1 == num || this.task2 == num) {
            console.log("");
          } else {
            this.task3 = num;
            counter++
          }
        }
      }
    },
    acceptChallenge: function () {
      this.closeWindow()
      // set current task
      this.currentTask = this.clickedTask;
      // clear
      this.clickedTask = null;
      // Add new map for the functionality of user accepting the challenge
      this.showActivity(this.currentTaskMap);
    },

    cancelTask: function () {
      // display motivational speech
      determination.play();
      typeWriter("You cannot give up just yet...", 0, "game-over");
      setTimeout(() => typeWriter(this.username.toUpperCase().concat("!"), 0, "game-over"), 7000);
      setTimeout(() => typeWriter("Stay Determined!!!", 0, "game-over"), 14000);
      // reset internal data
      this.closeWindow();
      this.currentTask = null;
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

    refocusMap: function (whichMap) {
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
            enableHighAccuracy: true, // enabled high accuracy
            timeout: 8000, // wait a max of 8 seconds for user's location
            maximumAge: 8000 // allow 8 seconds of cached user's location
          }
        );
      }
      else {
        // Browser doesn't support Geolocation
        alert("Error: Your browser doesn't support geolocation.");
      }
    },

    updateUserMarker: function (user_pos, dest_pos, whichMap) {
      console.log("update position ", this.watchId);
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
      // get distance between user and destination in meters
      const dist = google.maps.geometry.spherical.computeDistanceBetween(user_pos, dest_pos);
      // task is consider completed if the distance between them is < 50 M
      if (this.currentTask !== null && dist <= 50) {
        this.completeActivity();
      }
      // store distance in MILES
      this.distance = dist / 1609;
    },

    completeActivity: function () {
      // play music
      //mission_passed_sound.play();
      // display modal
      document.getElementById("mis-com-button").click();
      // reset internal data
      this.closeWindow();
      if (this.currentTask === this.task1) {
        this.taskCompleted[0] = true;
      }
      else if (this.currentTask === this.task2) {
        this.taskCompleted[1] = true;
      }
      else {
        this.taskCompleted[2] = true;
      }
      this.currentTask = null;
    },

    showActivity: function (whichMap) {
      // create request to info about location of activity
      const request = {
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
            <img src=${place.photos[0].getUrl({ maxWidth: 250, maxHeight: 250 })} alt="image" />
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
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log(this.watchId);
          this.locationOn = false;
          alert("Error: The permission for location is denied.\n"
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
  },
  mounted() {
    // generate tasks
    this.getTasks();
    // shuffle the texts
    // start the text animation
    StartTextAnimation(0, "motivation");
  }
})

