//TODO: provide a favicon
let eyeIconArray = [
  // tha path values of eye icon used in password field
  "M14.23 19.18h0L25.71 7.71a1 1 0 1 0-1.42-1.42L21.73 8.86a12.92 12.92 0 0 0-17.3 5.73 3.11 3.11 0 0 0 0 2.82A12.94 12.94 0 0 0 8.49 22.1l-2.2 2.19a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l3.06-3.07h0l3.46-3.46zm-2-.79A4.45 4.45 0 0 1 11.5 16 4.51 4.51 0 0 1 16 11.5a4.45 4.45 0 0 1 2.39.7l-1.48 1.47A2.53 2.53 0 0 0 16 13.5 2.5 2.5 0 0 0 13.5 16a2.53 2.53 0 0 0 .17.91zM27.57 14.59A13.42 13.42 0 0 0 26 12.16l0 0 0 0a1 1 0 0 0-.13-.09l-.17-.11a.61.61 0 0 0-.18-.05.58.58 0 0 0-.19 0l-.18 0-.19 0-.18.09a.91.91 0 0 0-.13.08l0 0s0 0 0 0L13.88 22.71s0 .07-.07.1a.81.81 0 0 0-.12.18 1.39 1.39 0 0 0-.06.19s0 .08 0 .12a.43.43 0 0 0 0 .05.79.79 0 0 0 0 .22 1 1 0 0 0 0 .17 1.3 1.3 0 0 0 .08.17l.11.16s0 0 0 .05.07.05.1.08l.17.11a1.17 1.17 0 0 0 .2.06s.07 0 .12 0h.11A13.52 13.52 0 0 0 16 24.5a13 13 0 0 0 11.57-7.09A3.11 3.11 0 0 0 27.57 14.59z",
  "M27.57,14.59a13,13,0,0,0-23.14,0,3.11,3.11,0,0,0,0,2.82,13,13,0,0,0,23.14,0A3.11,3.11,0,0,0,27.57,14.59ZM16,20.5A4.5,4.5,0,1,1,20.5,16,4.51,4.51,0,0,1,16,20.5Z",
];
let ind = 0;

function toggleIcon(event) {
  // this toggles the visibility of password field and icon
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

// this function toggles the form into showing up by calling above function and hiding back also showing some fields more in register form
function setForm(isLogin) {
  let formElem = document.querySelector("#form");
  let elems = ["#Username", "#Phone", "#Sex", "#Date", "#Language"]; // the fields that needed to be shown when register form to be shown
  let a = document
    .getElementById("form")
    .getElementsByTagName("h4")[0]
    .getElementsByTagName("a")[1];
  let h2 = document.getElementById("form").getElementsByTagName("h2")[0];

  if (isLogin) {
    formElem.setAttribute("class", "formLogin");
    elems.forEach((elem) => {
      document.querySelector(elem).style.display = "none";
    });
    a.innerText = "Register";
    h2.innerText = "Login";
  } else {
    formElem.setAttribute("class", "formSignup");
    elems.forEach((elem) => {
      document.querySelector(elem).style.display = "block";
    });
    a.innerText = "";
    h2.innerText = "Register";
  }
}

function cartIncrement(event) {
  if (event.target.getAttribute("class") == "cartCount") return;
  // if cartCount element is thrown as event's target then the function will not do anything
  let val = Number(event.target.parentNode.innerText);
  event.target.parentNode.innerHTML = `<button
  class="cartIcon"
  onclick="this.classList.add('cartIconAdded'), addToCart(event)"
></button>${++val}`;

  //TODO : after increasing the count this function is supposed to report to the cart as well
}

// this function sets the session storage required by the cart page for generating cart data for checkout.
function addToCart(event) {
  // NOTE : this tecnnique is not good as it can easily be exploited by XSS hacking
  let elem = event.target.parentNode.parentNode.parentNode.parentNode;
  let product = {
    bookName: String(elem.getElementsByClassName("bookTitle")[0].innerText),
    author: String(elem.getElementsByClassName("author")[0].innerText),
    publisher: String(elem.getElementsByClassName("publisher")[0].innerText),
    price: String(elem.getElementsByClassName("price")[0].innerText),
    count: String(Number(event.target.parentNode.innerText) + 1),
    // here + 1 is done because when the cart button is clicked inititally there is nothing so it will be treated as 0 and the value is only being changed after the click
  };

  // loop to only store the value
  for (key in product) {
    if (key != "bookName" && key != "count")
      product[key] = product[key].substring(product[key].indexOf(":") + 2);
    // here +2 is done to increase the index to not include ': ' (colon and space) in the value string
  }

  let storage = window.sessionStorage;
  if (storage.getItem("cart") == null) {
    // if the cart doesn't exist
    let products = {
      books: [product],
      price: parseInt(product.price),
    };
    storage.setItem("cart", JSON.stringify(products));
    //JSON.stringify is used because local storage only supports string data type
    // so an object type is stored then on retrieving end [ohject object] will be shown
    console.log(products);
  } else {
    // if the cart does exist
    let cart = JSON.parse(storage.getItem("cart"));
    // JSON parse was required because the local storage stored the object in string type. So parse it as object
    let bookExists = false;
    cart.books.forEach((book) => {
      // check if the selected book exists or not
      if (book.bookName == product.bookName) {
        bookExists = true;
        // if it exists
        book.count++; // increase the count
        cart.price += parseInt(book.price); //add the price of the book into cart's price
      }
    });

    if (bookExists != true) {
      cart.books.push(product);
      cart.price += parseInt(product.price);
    }
    storage.setItem("cart", JSON.stringify(cart));
  }
}
