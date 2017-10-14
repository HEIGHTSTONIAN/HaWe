var signInBtn = document.getElementById("sign-in"),

  logInBtn = document.getElementById("login-btn"),

  signUpBtn = document.getElementById("sign-up"),

  signInForm = document.getElementsByClassName("sign-in")[0],

  signUpForm = document.getElementsByClassName("sign-up")[0],

  forgetBtn = document.getElementById("forget-btn"),

  forgetForm = document.getElementsByClassName("forget")[0];


signInBtn.onclick = function () {
  'use strict';

  signInForm.classList.add("showup");
  this.parentNode.style.display = "none";
}

signUpBtn.onclick = function () {
  'use strict';

  signUpForm.classList.add("showup");
  this.parentNode.style.display = "none";
  forgetForm.style.transform = "scale(0,0)";
  forgetForm.style.opacity = "0";
}

// forgetBtn.onclick = function () {
//   'use strict';

//   forgetForm.style.transform = "scale(1,1)";
//   forgetForm.style.opacity = "1";
// }

// document.getElementById("close-forget").onclick = function () {
//   'use strict';

//   forgetForm.style.transform = "scale(0,0)";
//   forgetForm.style.opacity = ".2";
// }



var navIn = document.getElementsByClassName("nav-in"),

  navUp = document.getElementsByClassName("nav-up");

navIn[0].onclick = function () {
  'use strict';

  signInForm.classList.add("showup");
  signUpForm.classList.remove("showup");
}

navUp[0].onclick = function () {
  'use strict';

  signInForm.classList.remove("showup");
  signUpForm.classList.add("showup");
}


var showWord = document.getElementsByClassName("eye"),

  passWord = document.getElementsByClassName("password");

function showPassword() {
  'use strict';

  if (passWord[0].type == "password") {
    passWord[0].type = "text";

  } else {
    passWord[0].type = "password";
  }


}


function showPasswordUp() {
  'use strict';

  if (passWord[1].type == "password") {

    passWord[1].type = "text";
    passWord[2].type = "text";

  } else {
    passWord[1].type = "password";
    passWord[2].type = "password";
  }
}


// FOR AJAX REQUEST STUFF

var usernameInput = $("input#login-username");
var passwordInput = $("input#login-password");

 // When the form is submitted, we validate there's an username and password entered
 $(".loggingin").on("submit", function(event) {
  event.preventDefault();

  console.log("hello");

  var userData = {
    username: usernameInput.val().trim(),
    password: passwordInput.val().trim()
  };

  if (!userData.username || !userData.password) {
    return;
  }

  // If we have an username and password we run the loginUser function and clear the form
  loginUser(userData.username, userData.password);
  usernameInput.val("");
  passwordInput.val("");
});

// loginUser does a post to our "api/login" route and if successful, redirects us the the members page
function loginUser(username, password) {
  $.post("/api/login", {
    username : username,
    password: password
  }).then(function(data) {
    window.location.replace(data);
    // If there's an error, log the error
  }).catch(function(err) {
    console.log(err);
  });
}

