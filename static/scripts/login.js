var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");

var x = document.getElementById("login");
var y = document.getElementById("register");

function loginSection() {
  x.style.left = "4px";
  y.style.right = "-520px";
  a.className += " white-btn";
  b.className = "btn";
  x.style.opacity = 1;
  y.style.opacity = 0;
}

function registerSection() {
  x.style.left = "-510px";
  y.style.right = "5px";
  a.className = "btn";
  b.className += " white-btn";
  x.style.opacity = 0;
  y.style.opacity = 1;
}

//-------->HANDLE LOGIN ACTION<--------//

async function handleLogin() {
  const unField = document.getElementById("loginUsername");
  const pwField = document.getElementById("loginPassword");

  if (!(unField.value && pwField.value)) {
    alert("Fill All fields");
    return;
  }

  let fetchReq = await fetch("http://127.0.0.1:5000/login/handleLogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: unField.value,
      password: pwField.value,
    }),
  });

  if (!fetchReq.ok) {
    alert("HTTP Error");
    throw new Error("\n\nResult Not Ok!\n\n");
  }

  result = await fetchReq.json();

  unField.value = "";
  pwField.value = "";

  if (result.status === "error") {
    alert("Wrong Credentials");
  } else {
    window.location.href = "http://127.0.0.1:5000/homepage";
  }
}

//-------->HANDLE REGISTER ACTION<--------//

async function handleRegister() {
  const fnField = document.getElementById("registerFirstname");
  const lnField = document.getElementById("registerLastname");
  const unField = document.getElementById("registerUsername");
  const pwField = document.getElementById("registerPassword");
  const cpwField = document.getElementById("registerConfirmPassword");

  //validate fields

  if (!(unField.value && pwField.value && fnField.value && lnField.value)) {
    alert("Fill All Fields");
    return;
  }

  if (!(pwField.value === cpwField.value)) {
    alert("Passwords do not match");
    pwField.value = "";
    cpwField.value = "";
    return;
  }

  //make http post

  const fetchReq = await fetch("http://127.0.0.1:5000/login/handleRegister", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: unField.value,
      password: pwField.value,
      fname: fnField.value,
      lname: lnField.value,
    }),
  });

  //throw http error

  if (!fetchReq.ok) {
    alert("HTTP Error");
    throw new Error("\n\nResult Not Ok!\n\n");
  }

  //get and process response

  const result = await fetchReq.json();

  if (result.integrityError) {
    console.log(result.integrityError);
    alert("Username already in use, please choose another.");
    return;
  } else if (result.otherError) {
    console.log(result.otherError);
    return;
  }

  alert("Account Created Successfully :D");
  unField.value = "";
  pwField.value = "";
  fnField.value = "";
  lnField.value = "";
  loginSection();
}

//-------->HANDLE REGISTER ACTION<--------//

function validatePassword() {
  const pwField = document.getElementById("registerPassword");
  const cpwField = document.getElementById("registerConfirmPassword");
  const errormsg = document.getElementById("error-message");

  document.getElementById("signup").disabled = true;

  if (pwField.value.length < 8) {
    errormsg.innerText = "Password must have 8 characters";
    return;
  }

  // function hasSpecialCharacter(){

  // }

  if (!(pwField.value === cpwField.value)) {
    errormsg.innerText = "Passwords do not match";
    return;
  }

  errormsg.innerText = "";
  document.getElementById("signup").disabled = false;
}