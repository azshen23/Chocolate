import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js";
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
    location.href= 'login.html'
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
            this.leaderboardArray = orderBySubKey(data, 'points').slice(0, 10).reverse()
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
          const storage = getStorage(app);
          var image = ref1(storage, '/profilepictures/' + this.leaderboardArray[i]['image']);
          var image2 = ref1(storage, '/badges/' + this.leaderboardArray[i]['badge']);

          getDownloadURL(image).then((url) =>{
            this.leaderboardArray[i]['image'] = url
          });

          getDownloadURL(image2).then((url) =>{
            this.leaderboardArray[i]['badge'] = url
          });
        },
        //get currentUser image urls
        getCurrentUserImageUrl: function(){
          const storage = getStorage(app);
          var image = ref1(storage, '/profilepictures/' + this.currentUserArray['image']);
          var image2 = ref1(storage, '/badges/' + this.currentUserArray['badge']);

          getDownloadURL(image).then((url) =>{
            this.currentUserPfpUrl = url
          });

          getDownloadURL(image2).then((url) =>{
            this.currentUserBadgeUrl = url
          });
        }
    },
    beforeMount(){
      setTimeout(() => this.getValues(), 500);
   }
})