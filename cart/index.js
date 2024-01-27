let listproductHTML=document.querySelector('.listcart');

let listproducts=[];

const addDataToHTML=(cart={books:[],price:Number})=>{
    listproductHTML.innerHTML = '';
    let elems = [];    
    cart['books'].forEach(product =>{
            // newProduct.classList.add('item');
            elems.push(`<div class = 'item' >${product.bookName}</div>`);
                
        })
        listproductHTML.innerHTML = elems.join('');
              
}
const initApp=()=>{
    // fetch('cartproducts.json')
    // .then(response=>response.json())
    // .then(data => {
    //     listproducts=data;
    //     addDataToHTML();
    // })
    let cart = JSON.parse(window.sessionStorage.getItem("cart"));
    console.log(cart.books);

    addDataToHTML(cart);
}
initApp();