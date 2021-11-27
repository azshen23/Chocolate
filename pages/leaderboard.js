import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
import { getStorage, ref as ref1, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-storage.js";

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
var uid = null;



function orderBySubKey( input, key ) {
  return Object.values( input ).map( value => value ).sort( (a, b) => a[key] - b[key] );
}



onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
  } else {
    location.href= 'index.html'
  }
});



var resultView = new Vue({
    el: '#leaderboard',
    data: {
      leaderboardArray: null,
      currentUserArray: null,
      currentUserBadgeUrl: null,
      currentUserPfpUrl: null,
      currentUserPosition: null
    },
    methods: {
        //initialize top 10 users array
        getValues: function(){
          var db = ref(getDatabase(), 'users');
          onValue(db, (snapshot) => {
            var data = snapshot.val();
            this.leaderboardArray = orderBySubKey(data, 'points').reverse().slice(0, 10)
            for (var i = 0; i < this.leaderboardArray.length; i++)
            {
              this.getImageUrl(i)
            }
          });

          onValue(db, (snapshot) => {
            var data = snapshot.val();
            var tempArray = orderBySubKey(data, 'points').reverse()
            console.log(tempArray)
            this.currentUserArray = data[uid];
            this.currentUserPosition = tempArray.findIndex(x => x.email === this.currentUserArray['email'])
            this.getCurrentUserImageUrl()
          });
        },
        //get image url from databse
        getImageUrl: function(i){
          this.leaderboardArray[i]['badge'] = "images/badges/" + this.leaderboardArray[i]['badge']
          this.leaderboardArray[i]['image'] = "images/profile_animals/" +  this.leaderboardArray[i]['image']
        },
        //get currentUser image urls
        getCurrentUserImageUrl: function(){

          this.currentUserBadgeUrl = "images/badges/" + this.currentUserArray['badge']
          this.currentUserPfpUrl = "images/profile_animals/" + this.currentUserArray['image']
        }
    },
    beforeMount(){
      setTimeout(() => this.getValues(), 500);
   }
})