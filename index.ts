// EXERCISE 2
interface IProduct {
    productName: string;
    productId: number;
    productPrice: number;
    productDate: number;
  }
  
  class Product implements IProduct {
    constructor(
      public productName: string,
      public productPrice: number,
      public productDate: number,
      public productId: number
    ) {}
  }
  
  class Cart {
    private static instance: Cart;
    public static productList: Product[] = [];
  
    private constructor() {}
  
    public static createInstance() {
      if (!Cart.instance) {
        Cart.instance = new Cart();
        return Cart;
      }
  
      throw new Error("Cart is already created.");
    }
  
    public static addProductToCart(
      productName: string,
      productPrice: string,
      productDate: string,
      productId: number
    ): void {
      
      this.productList.push(
        new Product(
          productName,
          parseInt(productPrice, 10),
          parseInt(productDate, 10),
          productId
        )
      );
    }
  
    public static deleteProductFromCart(productId:number) {
      let indexToRemove = this.productList.findIndex((product)=> product.productId === productId);
      this.productList.splice(indexToRemove,1);
    }
  }
  
  //let isFirstVisit = true;
  Cart.createInstance();
  let saveButton = document.querySelector(".submit-input");
  let delButton = document.querySelector(".cart-item .delete");
  let displayedProducts = document.querySelector(".cart-list");
  let counter=0;
  
  saveButton?.addEventListener("click", () => {
    let name = (<HTMLInputElement>document.querySelector('[name = "product-name"]')).value;
    let price = (<HTMLInputElement>document.querySelector('[name = "product-price"]')).value;
    let date = (<HTMLInputElement>document.querySelector('[name = "product-date"]')).value;
    let id = counter;
    
    // Update productList in cart
    Cart.addProductToCart(
      name,
      price,
      date,
      id
    );


    // Update product list in display
    addCartItemDisp(name, price, date, id);

    // Increase the counter to use it as ID in next cart item.
    // I'm aware that this counter never gets reset to 0 and this is not a good practice.
    // It's only used for the sake of this exercise.
    // Normally a unique id generator package would suit better.
    counter++;  
  });

  

  


  function addCartItemDisp(productName:string, productPrice:string, productDate:string, productId:number){
    let wrapper = document.createElement("div")
    wrapper.classList.add("cart-item")
    wrapper.setAttribute("id", `${productId}`)

    let p1 = document.createElement("p")
    p1.classList.add("heading")
    p1.appendChild(document.createTextNode(`${productName}`))

    wrapper.appendChild(p1);

    let description = document.createElement("div")
    description.classList.add("item-desc")

    let p2 = document.createElement("p")
    p2.classList.add("price")
    p2.innerHTML = `<b>Price:</b> ${productPrice}$`
    
    let p3 = document.createElement("p")
    p3.classList.add("date")
    p3.innerHTML = `<b>Year:</b> ${productDate}`

    let btn = document.createElement("button")
    btn.classList.add("delete")
    btn.appendChild(document.createTextNode("Delete"))
    btn.addEventListener("click", ()=>{
      Cart.deleteProductFromCart(productId)
      deleteCartItemDisp(productId)
    })

    description.appendChild(p2)
    description.appendChild(p3)
    description.appendChild(btn)

    wrapper.appendChild(description)

    displayedProducts?.appendChild(wrapper)
  }

  function deleteCartItemDisp(id:number){
    let itemToRemove = <HTMLDivElement>document.getElementById(`${id}`);
    itemToRemove.remove();
  }

  



  