var config = {
    apiKey: "AIzaSyBYf2-BxsKecRiQi1nt_PnSX3rchKoy8ws",
    authDomain: "vessel-dc69e.firebaseapp.com",
    databaseURL: "https://vessel-dc69e.firebaseio.com",
    projectId: "vessel-dc69e",
    storageBucket: "vessel-dc69e.appspot.com",
    messagingSenderId: "864477881745"
  };
  
var firebaseApp = firebase.initializeApp(config);
var itemRef = firebaseApp.database();
var storageRef = firebase.storage();

