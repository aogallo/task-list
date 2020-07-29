import * as firebase from 'firebase'


const settings = { timestampsInSnapshots: true };
let app = null;
let db = null;

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDABpzhW2QJJof1uh0BWdW4qQosoOjrfbQ",
    authDomain: "task-list-10919.firebaseapp.com",
    databaseURL: "https://task-list-10919.firebaseio.com",
    projectId: "task-list-10919",
    storageBucket: "task-list-10919.appspot.com",
    messagingSenderId: "635632623865",
    appId: "1:635632623865:web:fdaa2a412a5f8343dd4228",
    measurementId: "G-7T5QCM45LR"
};

// Initialize Firebase
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
}

// firebase.firestore().settings(settings);
db = firebase.firestore(app);

export default db;