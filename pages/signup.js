// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
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

var resultView = new Vue({
    el: '#signUp',
    data: {
        name: null,
        email: null,
        password: null
    },
    methods: {
        signUpUser: function(){
            console.log("hi")
            createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                location.href = 'login.html';
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage + " " + errorCode)
                // ..
            });

        }
    }
})




