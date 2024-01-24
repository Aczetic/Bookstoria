//TODO: provide a favicon
let eyeIconArray = [
  "M14.23 19.18h0L25.71 7.71a1 1 0 1 0-1.42-1.42L21.73 8.86a12.92 12.92 0 0 0-17.3 5.73 3.11 3.11 0 0 0 0 2.82A12.94 12.94 0 0 0 8.49 22.1l-2.2 2.19a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l3.06-3.07h0l3.46-3.46zm-2-.79A4.45 4.45 0 0 1 11.5 16 4.51 4.51 0 0 1 16 11.5a4.45 4.45 0 0 1 2.39.7l-1.48 1.47A2.53 2.53 0 0 0 16 13.5 2.5 2.5 0 0 0 13.5 16a2.53 2.53 0 0 0 .17.91zM27.57 14.59A13.42 13.42 0 0 0 26 12.16l0 0 0 0a1 1 0 0 0-.13-.09l-.17-.11a.61.61 0 0 0-.18-.05.58.58 0 0 0-.19 0l-.18 0-.19 0-.18.09a.91.91 0 0 0-.13.08l0 0s0 0 0 0L13.88 22.71s0 .07-.07.1a.81.81 0 0 0-.12.18 1.39 1.39 0 0 0-.06.19s0 .08 0 .12a.43.43 0 0 0 0 .05.79.79 0 0 0 0 .22 1 1 0 0 0 0 .17 1.3 1.3 0 0 0 .08.17l.11.16s0 0 0 .05.07.05.1.08l.17.11a1.17 1.17 0 0 0 .2.06s.07 0 .12 0h.11A13.52 13.52 0 0 0 16 24.5a13 13 0 0 0 11.57-7.09A3.11 3.11 0 0 0 27.57 14.59z",
  "M27.57,14.59a13,13,0,0,0-23.14,0,3.11,3.11,0,0,0,0,2.82,13,13,0,0,0,23.14,0A3.11,3.11,0,0,0,27.57,14.59ZM16,20.5A4.5,4.5,0,1,1,20.5,16,4.51,4.51,0,0,1,16,20.5Z",
];
let ind = 0;

function toggleIcon(event) {
  ind = ++ind % 2;
  document.getElementById("eye").setAttribute("d", eyeIconArray[ind]);
  let elem = document.getElementById("password");

  elem.setAttribute(
    "type",
    elem.getAttribute("type") == "password" ? "text" : "password"
  );
}

function toggleForm(setState) {
  document.getElementById("form").style.transform = `scale(${parseInt(
    setState
  )})`;
}

function setForm(isLogin) {
  let formElem = document.querySelector("#form");
  let username = document.querySelector("#Username");
  let a = document
    .getElementById("form")
    .getElementsByTagName("h4")[0]
    .getElementsByTagName("a")[1];
  let h2 = document.getElementById("form").getElementsByTagName("h2")[0];

  if (isLogin) {
    formElem.setAttribute("class", "formLogin");
    username.style.display = "none";
    a.innerText = "Register";
    h2.innerText = "Login";
  } else {
    formElem.setAttribute("class", "formSignup");
    username.style.display = "block";
    a.innerText = "";
    h2.innerText = "Register";
  }
}
