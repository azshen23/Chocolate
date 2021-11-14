import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js";
import { getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
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
const analytics = getAnalytics(app);
const auth = getAuth();

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
    el: '#profile',
    data: {
    },
    methods: {
      //once user signout, the token should be cleared and they should be redirected to the login page
      signOut: function(){
        signOut(auth).then(() => {
          location.href = "login.html"
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage + " " + errorCode)
        });
      }
    }
})


