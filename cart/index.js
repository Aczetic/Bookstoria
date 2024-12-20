let listproductHTML = document.querySelector(".listcart");

let listproducts = [];

// product.bookName: gives the name of the book or the title of the book
// product.coverImage: gives the address of the cover image of the book used in catalogue, to use it set the style = 'background-image : ${product.coverImage}'
// product.author: gives the name of the author of the book
// product.publisher: gives the name of the publisher of the book
// product.price: gives the price of the book in pirce_$ format e.g. 20$
// product.count: gives the count of the book added into the cart of the same type.
// the above code is supposed to be added in the forEach();
//cart.price : tells the total price of the card, this values is not supposed to be used in the forEach
// because the forEach produces the elements for the selected books but he price shown in a separate element all
// the time.

const addDataToHTML = (cart = { books: [], price: Number }) => {
  listproductHTML.innerHTML = "";
  let elems = [];
  cart["books"].forEach((product) => {
    // newProduct.classList.add('item');
    elems.push(` <div class='item'>
                  <div class='image' style = 'background-image:${product.coverImage}'>
                    
                        
                  </div>
                 <div class="name">
                      
                     ${product.bookName}
                     <br>
                  Author~ ${product.author}
                    
                 </div> 
                 <div class="price">
                   
                   ${product.price}
  
                   
                 </div>
                 <div class ="quantity">

                  <span>${product.count}</span>
                  
                 </div>
              </div> `);
  });
  elems.push(
    ` <div style = "height:50px; width:100%; display:flex; justify-content:flex-end"></div> `
  );

  listproductHTML.innerHTML = elems.join("");
  document.getElementsByClassName(
    "total"
  )[0].innerText = `Total Price : ${cart.price}$`;
};

const initApp = () => {
  // fetch('cartproducts.json')
  // .then(response=>response.json())
  // .then(data => {
  //     listproducts=data;
  //     addDataToHTML();
  // })
  let cart = JSON.parse(window.localStorage.getItem("cart"));
  console.log(cart.books);

  addDataToHTML(cart);
};
initApp();
