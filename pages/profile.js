import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { getStorage, ref as ref1, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-storage.js";
import { getDatabase, ref, onValue, set, update } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

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
const user = auth.currentUser;
var uid = null;
//if user is currently not logged in a session, they will be redirected to the log in page
//comment out for now since this well intefere with development of the page
onAuthStateChanged(auth, (user) => {
  if (user) { 
    uid = user.uid;
  } else {
    location.href= 'index.html'
  }
});
var resultView = new Vue({
    el: '#profile',
    data: {
      imageUrl: null,
      currentUserArray: null,
      picture_choose_clicked: false,
      badgeUrl: null,
      animals: ["beaver", "crab", "dog", "elephant", "fox", "giraffe", "hippo", "penguin", "squirrel", "turtle"],
      currentUserName: null,
      currentUserPoints: null,
      currentUserLevel: null
    },
    methods: {
      //once user signout, the token should be cleared and they should be redirected to the login page
      signOut: function(){
        signOut(auth).then(() => {
          
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      },
      picture_click: function(picture) {
        const db = getDatabase();
        set(ref(db, 'users/' + uid + "/image"), picture)
        .catch((error) => {
            console.log(error.message)
        });
        this.imageUrl = "../images/profile_animals/" + picture
        /* const storage = getStorage(app);
        var image = ref1(storage, '/profilepictures/' + picture);
        getDownloadURL(image).then((url) =>{
          this.imageUrl = url
        }); */
        this.picture_choose_clicked = false;

      },
      getBadgeUrl: function(badge){
        this.badgeUrl = "../images/badges/" + badge
      },
      getValues: function(){
        var db = ref(getDatabase(), 'users');
        onValue(db, (snapshot) => {
          var data = snapshot.val();
          this.currentUserArray = data[uid];
          this.currentUserName = this.currentUserArray['name']
          this.currentUserPoints = this.currentUserArray['points']
          this.setPfp(this.currentUserArray['image'])
          this.getBadgeUrl(this.currentUserArray['badge'])
          this.currentUserLevel = this.currentUserArray['level']
        });
      },
      change_button_clicked: function() {
        this.picture_choose_clicked = true;
      },
      setPfp: function(picture)
      {
        this.imageUrl = "../images/profile_animals/" + picture
      } 
    },
    beforeMount(){
      setTimeout(() => this.getValues(), 500);
   }
})


