// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import {getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

//if logged in, redirect to activity page
onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setTimeout(function(){
          location.href= 'profile.html'
        }, 500)
    } else {
      
    }
  }); 


var resultView = new Vue({
    el: '#signUp',
    data: {
        name: null,
        email: null,
        password: null
    },
    methods: {
        signUpUser: function(){
            createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                writeUserData(user.uid, this.name, this.email)
                updateProfile(auth.currentUser, {
                    displayName: this.name
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage + " " + errorCode)
                })

                

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage + " " + errorCode)
            });

        }
    }
})


//add user to datatbase
function writeUserData(userId, name, email) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      name: name,
      email: email,
      currentTaskID: -1
    })
    .catch((error) => {
        console.log(error.message)
    });
}




