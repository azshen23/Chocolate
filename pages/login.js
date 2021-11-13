// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
    el: '#app',
    data: {

    },
    methods: {
        getArtists: function () {
            axios.get("https://itunes.apple.com/search?term=" + this.artistNameSearch + "&origin=*")
                .then(response => {
                    if (response.data.resultCount == 0) {
                        alert("No results found")
                    }
                    else {
                        this.resultCount = response.data.resultCount;
                        this.filteredResults = response.data.results;
                        this.results = response.data.results;
                    }
                    console.log(response.data)

                })
                .then(this.loaded = true);
        }
    }
})






createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });


signInWithCustomToken(auth, token)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
    });



const auth = getAuth();
signOut(auth).then(() => {
    // Sign-out successful.
}).catch((error) => {
    // An error happened.
});