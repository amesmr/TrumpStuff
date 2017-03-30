var config = {
    apiKey: "AIzaSyApfWeyBvq2w2QGe97I-Ge5fp4cI9zGGSE",
    authDomain: "trumpstuff-50d77.firebaseapp.com",
    databaseURL: "https://trumpstuff-50d77.firebaseio.com",
    storageBucket: "trumpstuff-50d77.appspot.com",
    messagingSenderId: "204584749741"
};

firebase.initializeApp(config)
var database = firebase.database();


console.log(createUser());

function createUser() {
    firebase.auth().createUserWithEmailAndPassword("matt@gmail.com", "hello").catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}


function signIn() {
    firebase.auth().signInWithEmailAndPassword(userName, password).catch(function (error) {
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
$("#logout").on("click", function () {

    signOut();


});
$("#submituser").on("click", function () {
    userName = $("#username").val();
    password = $("#password").val();

    signIn();


});




function displayUser() {
    $("#displayUser").html(userName + " is logged in");

}

function signOut() {
    firebase.auth().signOut().then(function () {
        console.log("you are signed out");
    }, function (error) {
        console.log(error);
    });
}