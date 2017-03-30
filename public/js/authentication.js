
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCAn7uijojtF8McvMwuRtjOwiopN3_enqk",
    authDomain: "trainjjw.firebaseapp.com",
    databaseURL: "https://trainjjw.firebaseio.com",
    storageBucket: "trainjjw.appspot.com",
    messagingSenderId: "765865960520"
  };
  firebase.initializeApp(config);

var database = firebase.database();


createUser();
function createUser() {
    firebase.auth().createUserWithEmailAndPassword("matt@gmail.com", "hello").catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}


function signIn() {
    firebase.auth().signInWithEmailAndPassword(userName, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        displayUser();
        $("#username").val("");
        $("#password").val("");
    });


}
$("#logout").on("click", function() {

    signOut();


});
$("#submituser").on("click", function() {
    userName = $("#username").val();
    password = $("#password").val();

    signIn();


});




function displayUser() {
    $("#displayUser").html(userName + " is logged in");

}

function signOut() {
    firebase.auth().signOut().then(function() {
        console.log("you are signed out");
    }, function(error) {
        console.log(error);
    });
}
