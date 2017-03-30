//   // james firebase
//   var config = {
//       apiKey: "AIzaSyA5zhoPAcAHa_ihboPI-vaPgsN5WqrBAvA",
//       authDomain: "trumpjjw.firebaseapp.com",
//       databaseURL: "https://trumpjjw.firebaseio.com",
//       storageBucket: "trumpjjw.appspot.com",
//       messagingSenderId: "68421990596"
//   };


    // matt firebase
  var config = {
      apiKey: "AIzaSyApfWeyBvq2w2QGe97I-Ge5fp4cI9zGGSE",
      authDomain: "trumpstuff-50d77.firebaseapp.com",
      databaseURL: "https://trumpstuff-50d77.firebaseio.com",
      storageBucket: "trumpstuff-50d77.appspot.com",
      messagingSenderId: "204584749741"
  };

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


  function createUser() {
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
              password: password,
              username: userName
          });

      });

      // $.modal.close();
  }

  $("#logout").on("click", function () {
      signOut();
  });

  $("#login").on("click", function () {
      email = $("#email-address2").val();
      password = $("#password2").val();
      signIn();
  });

  function signIn() {
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          alert("incorrect email/password combination");

      }).then(function (onResolve, onReject) {
          console.log(onResolve);

          if (onResolve) {
              database.ref("/users/" + onResolve.uid).on("value", function (snapshot) {
                  userName = snapshot.val().username;
              });
              setTimeout(alertLogin, 1500);
              email = $("#email-address2").val("");
              password = $("#password2").val("");
          } else {
              console.log(onReject);
          }

      });
  }


  function signOut() {
      firebase.auth().signOut().then(function () {
          alert(userName + " you are signed out. Come back soon!!!");
      }, function (error) {
          console.log(error);
      });
  }

  function alertLogin() {
      alert("Welcome back " + userName);
  }