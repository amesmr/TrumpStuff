  // james firebase
  var config = {
      apiKey: "AIzaSyA5zhoPAcAHa_ihboPI-vaPgsN5WqrBAvA",
      authDomain: "trumpjjw.firebaseapp.com",
      databaseURL: "https://trumpjjw.firebaseio.com",
      storageBucket: "trumpjjw.appspot.com",
      messagingSenderId: "68421990596"
  };


  //   matt firebase
  // var config = {
  //     apiKey: "AIzaSyApfWeyBvq2w2QGe97I-Ge5fp4cI9zGGSE",
  //     authDomain: "trumpstuff-50d77.firebaseapp.com",
  //     databaseURL: "https://trumpstuff-50d77.firebaseio.com",
  //     storageBucket: "trumpstuff-50d77.appspot.com",
  //     messagingSenderId: "204584749741"
  // };

  firebase.initializeApp(config);

  // global variables
  var database = firebase.database();
  var email;
  var password;
  var confirmPassword
  var dob;
  var name;
  var userName;

  // validate password confirmation

  $("#signup").on("click", function validatePassword() {
      userName = $("#userName").val();
      password = $("#password").val();
      confirmPassword = $("#confirmPassword").val();
      email = $("#email-address").val();
      dob = $("#DOB").val();
      name = $("#Name").val();

      console.log("password: " + password);
      console.log("confirm password: " + confirmPassword);
      if (password === confirmPassword) {
          $("#email-address").val("");
          $("#userName").val("");
          $("#password").val("");
          $("#confirmPassword").val("");
          $("#DOB").val("");
          $("#Name").val("");
          createUser();
          console.log("they match!!!");

      } else {
          alert("Your passwords do not match; try again");
          $("#email-address").val("");
          $("#userName").val("");
          $("#password").val("");
          $("#confirmPassword").val("");
          $("#DOB").val("");
          $("#Name").val("");
      }

  });


  function createUser () {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
              // Handle Errors here.
              console.log(error.code);
              console.log(error.message);
              alert(error.message);
              // ...
          }).then(function (onResolve, onReject) {
              console.log(onResolve);
              console.log(onReject);
              database.ref("/users/" + onResolve.uid).set({
                  name: name,
                  email: email,
                  DOB: dob,
                  password: password
              });
       
          });

      // $.modal.close();
  }


  // $("#login").on("click", function login() {
  //     var email = $("#email-address2").val();
  //     var password = $("#password2").val();
  //     firebase.auth().signInWithEmailAndPassword(email, password)
  //         .catch(function (error) {
  //             // Handle Errors here.
  //             var errorCode = error.code;
  //             var errorMessage = error.message;
  //             console.log(errorCode);
  //             console.log(errorMessage);
  //         }).then(function (onResolve, onReject) {
  //             console.log(onResolve);
  //             console.log(onReject);
  //             var thisUser = database.ref("/users/" + onResolve.uid);

  //             displayUser(thisUser.name);
  //             $("#email-address2").val("");
  //             $("#password2").val("");
  //         });


  // });
  // $("#logout").on("click", function () {

  //     signOut();


  // });
  // $("#submituser").on("click", function () {
  //     userName = $("#username").val();
  //     password = $("#password").val();

  //     signIn();


  // });




  // function displayUser(userName) {
  //     $("#displayUser").html(userName + " is logged in");

  // }

  // function signOut() {
  //     firebase.auth().signOut().then(function () {
  //         console.log("you are signed out");
  //     }, function (error) {
  //         console.log(error);
  //     });
  // }



  // ---------------------------------------------------------------------------//

//   $("#logout").on("click", function () {

//       signOut();


//   });
//   $("#submituser").on("click", function () {
//       userName = $("#username").val();
//       password = $("#password").val();

//       signIn();


//   });




//   function displayUser() {
//       $("#displayUser").html(userName + " is logged in");

//   }

//   function createUser() {
//       firebase.auth().createUserWithEmailAndPassword("jwin4740@gmail.com", "helloworld").catch(function (error) {
//           // Handle Errors here.
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           // ...
//       });
//   }


//   function signIn() {
//       firebase.auth().signInWithEmailAndPassword(userName, password).catch(function (error) {
//           // Handle Errors here.
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           console.log(errorCode);
//           console.log(errorMessage);
//           displayUser();
//           $("#username").val("");
//           $("#password").val("");
//       });


//   }


//   function signOut() {
//       firebase.auth().signOut().then(function () {
//           console.log("you are signed out");
//       }, function (error) {
//           console.log(error);
//       });
//   }