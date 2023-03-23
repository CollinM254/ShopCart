"use strict";
class Product {
    constructor(productName, productPrice, productDate, productId) {
        this.productName = productName;
        this.productPrice = productPrice;
        this.productDate = productDate;
        this.productId = productId;
    }
}
class Cart {
    constructor() { }
    static createInstance() {
        if (!Cart.instance) {
            Cart.instance = new Cart();
            return Cart;
        }
        throw new Error("Cart is already created.");
    }
    static addProductToCart(productName, productPrice, productDate, productId) {
        this.productList.push(new Product(productName, parseInt(productPrice, 10), parseInt(productDate, 10), productId));
    }
    static deleteProductFromCart(productId) {
        let indexToRemove = this.productList.findIndex((product) => product.productId === productId);
        this.productList.splice(indexToRemove, 1);
    }
}
Cart.productList = [];
//let isFirstVisit = true;
Cart.createInstance();
let saveButton = document.querySelector(".submit-input");
let delButton = document.querySelector(".cart-item .delete");
let displayedProducts = document.querySelector(".cart-list");
let counter = 0;
saveButton === null || saveButton === void 0 ? void 0 : saveButton.addEventListener("click", () => {
    let name = document.querySelector('[name = "product-name"]').value;
    let price = document.querySelector('[name = "product-price"]').value;
    let date = document.querySelector('[name = "product-date"]').value;
    let id = counter;
    // Update productList in cart
    Cart.addProductToCart(name, price, date, id);
    // Update product list in display
    addCartItemDisp(name, price, date, id);
    // Increase the counter to use it as ID in next cart item.
    // I'm aware that this counter never gets reset to 0 and this is not a good practice.
    // It's only used for the sake of this exercise.
    // Normally a unique id generator package would suit better.
    counter++;
});
function addCartItemDisp(productName, productPrice, productDate, productId) {
    let wrapper = document.createElement("div");
    wrapper.classList.add("cart-item");
    wrapper.setAttribute("id", `${productId}`);
    let p1 = document.createElement("p");
    p1.classList.add("heading");
    p1.appendChild(document.createTextNode(`${productName}`));
    wrapper.appendChild(p1);
    let description = document.createElement("div");
    description.classList.add("item-desc");
    let p2 = document.createElement("p");
    p2.classList.add("price");
    p2.innerHTML = `<b>Price:</b> ${productPrice}$`;
    let p3 = document.createElement("p");
    p3.classList.add("date");
    p3.innerHTML = `<b>Year:</b> ${productDate}`;
    let btn = document.createElement("button");
    btn.classList.add("delete");
    btn.appendChild(document.createTextNode("Delete"));
    btn.addEventListener("click", () => {
        Cart.deleteProductFromCart(productId);
        deleteCartItemDisp(productId);
    });
    description.appendChild(p2);
    description.appendChild(p3);
    description.appendChild(btn);
    wrapper.appendChild(description);
    displayedProducts === null || displayedProducts === void 0 ? void 0 : displayedProducts.appendChild(wrapper);
}
function deleteCartItemDisp(id) {
    let itemToRemove = document.getElementById(`${id}`);
    itemToRemove.remove();
}
