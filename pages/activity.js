import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
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
    el: '#activity',
    data: {
      allTasks: [{'description' : "Go to CCRB0", location: "xyz0", "points": "0"}],
      task1: 0,
      task2: 1,
      task3: 2,
      selectedTask: -1,
    },
    methods: {
      setTasks: function() {
        for(let i = 1; i < 50; i++) {
          resultView.allTasks.push(
            {
              description: "Go to CCRB" + i,
              location: "xyz" + i,
              points: i
            }
          )
        }
      },
      getTasks: function() {
        console.log("DAWD")
        console.log(resultView.task1);
        let counter = 0;
        while(counter < 3) {
          let num = Math.floor(Math.random() * 51);
          if(counter == 0) {
            resultView.task1 = num;
            counter++;
          } else if(counter == 1) {
            if(resultView.task1 == num) {
              console.log("")
            } else {
              resultView.task2 = num;
              counter++;
            }
          } else if(counter == 2) {
            if(resultView.task1 == num || resultView.task2 == num) {
              console.log("");
            } else {
              resultView.task3 = num;
              counter++
            }
          }
        }
      },
      searchMap: function(location) {
        console.log(location);
      },
    }
})

resultView.setTasks();