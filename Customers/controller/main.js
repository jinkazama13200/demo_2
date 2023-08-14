let shoeShop = [];
let cart = [];

const toggleCart = getEl("#shopping");
const totalText = getEl(".total-text");
const totalPrice = getEl(".total-price");
const body = getEl("#myBody");
const buyBtn = getEl(".buy-button");
const emptyNote = getEl(".empty-note");

// init cart
initCart();
function initCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  const checkEmptyCart = (cart) => {
    if (cart.length > 0) {
      buyBtn.style.display = "block";
      emptyNote.style.display = "none";
      totalText.style.display = "block";
      totalPrice.style.display = "block";
    }
  };
  checkEmptyCart(cart);
  renderCart(cart);
}

// get product data
getProduct();
function getProduct() {
  apiGetProducts()
    .then((res) => {
      shoeShop = res.data;
      renderShoe(shoeShop);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Utils
function getEl(n) {
  return document.querySelector(n);
}

// renderShoe

function renderShoe(shoe) {
  const currency = (value) =>
    new Intl.NumberFormat("vn-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  const render = shoe.reduce((result, value) => {
    const shoeItem = new Product(
      value.id,
      value.name,
      value.price,
      value.image,
      value.type,
      value.material,
      value.color
    );
    return (
      result +
      `<div class="col-4">
              <div class="card shoe-item">
                <div class="card-header">
                  <img/ class="card-img" src="${
                    shoeItem.image
                  }" width="100px" height="100px">
                </div>
                <div class="card-body text-center">
                  <p class="shoe-name">${shoeItem.name}</p>
                  <p class="shoe-color">Color: ${shoeItem.color}</p>
                  <p class="shoe-material">Material: ${shoeItem.material}</p>
                  <p class="shoe-type">${shoeItem.type}</p>
                  <p class="shoe-price">${currency(shoeItem.price)}</p>
                </div>
                <div class="card-footer d-flex  justify-content-between align-items-center p-3">
                  <button onclick="addToCart('${
                    shoeItem.id
                  }')" class="add-btn btn btn-dark">Add To Cart</button>
                  <span class="status">In Stock</span>
                </div>   
              </div>
            </div>`
    );
  }, "");
  getEl("#product-list").innerHTML = render;
}

// -------------------------------------------------------

toggleCart.addEventListener("click", () => {
  body.classList.toggle("show");
});

// add to cart
function addToCart(id) {
  const checkEmptyCart = (cart) => {
    if (cart.length > 0) {
      buyBtn.style.display = "block";
      emptyNote.style.display = "none";
      totalText.style.display = "block";
      totalPrice.style.display = "block";
    }
  };
  const findItem = shoeShop.find((value) => {
    if (value.id === id) {
      return value;
    }
  });
  const shoeItem = new Cartitem(
    findItem.id,
    findItem.name,
    findItem.price,
    findItem.image,
    1
  );
  const newShoeItem = cart.find((value) => {
    if (value.id === id) {
      return value;
    }
  });
  if (newShoeItem) {
    newShoeItem.quantity++;
  } else {
    cart.push(shoeItem);
  }
  checkEmptyCart(cart);
  renderCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// render cart
function renderCart(cart) {
  //total price
  const totalBill = (cart) => {
    let total = 0;
    cart.forEach((value) => {
      return (total += value.price * value.quantity);
    });
    return currency(total);
  };
  // total count
  const totalCount = (cart) => {
    let count = 0;
    cart.find((value) => {
      count += value.quantity;
    });
    return count;
  };
  //currency
  const currency = (value) =>
    new Intl.NumberFormat("vn-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  const count = getEl("#quantity");
  const list = getEl(".cart-list");
  const cartRender = cart.reduce((result, value) => {
    return (
      result +
      `<div class="cart-item d-flex">
        <div class="cart-img">
          <img/ src=${value.image} width="70px" height="70px">    
        </div>
        <div class="cart-content">
          <p class="name">
            ${value.name} 
          </p>
          <p>
            ${currency(value.price)}
            <span class="count">Quantity: ${value.quantity}</span>
            <button onclick="handleDec('${
              value.id
            }')" class="control-button">-</button>
            <button onclick="handleInc('${
              value.id
            }')" class="control-button">+</button>
            <span onclick="removeItem('${value.id}')" class="remove">
              <i class="fa-solid fa-trash-can"></i>
            </span>
          </p>
        </div> 
    </div>
    <hr>
    `
    );
  }, "");
  totalPrice.innerHTML = totalBill(cart);
  count.innerHTML = totalCount(cart);
  list.innerHTML = cartRender;
}

// remove item from cart
function removeItem(id) {
  const checkEmptyCart = (cart) => {
    if (cart.length === 0) {
      buyBtn.style.display = "none";
      emptyNote.style.display = "block";
      totalText.style.display = "none";
      totalPrice.style.display = "none";
    }
  };
  const find = cart.find((value) => {
    if (value.id === id) {
      return value;
    }
  });
  if (find) {
    cart = cart.filter((value) => {
      return value.id !== id;
    });
  }
  checkEmptyCart(cart);
  renderCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// buy function
function purchaseItem() {
  alert(`Purchase Successfully \n Have a nice day!!!`);
  cart = [];
  renderCart(cart);
  totalPrice.style.display = "none";
  totalText.style.display = "none";
  buyBtn.style.display = "none";
  emptyNote.style.display = "block";
  body.classList.remove("show");
  localStorage.setItem("cart", JSON.stringify(cart));
}

//item quantity control func
// ++++++++
function handleInc(id) {
  const increaseQuantity = cart.find((value) => {
    if (value.id === id) {
      return value;
    }
  });
  if (increaseQuantity) {
    increaseQuantity.quantity++;
  }
  renderCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}
//---------
function handleDec(id) {
  const checkEmptyCart = (cart) => {
    if (cart.length === 0) {
      buyBtn.style.display = "none";
      emptyNote.style.display = "block";
      totalText.style.display = "none";
      totalPrice.style.display = "none";
    }
  };
  const decreaseQuantity = cart.find((value) => {
    if (value.id === id) {
      return value;
    }
  });
  if (decreaseQuantity?.quantity === 1) {
    cart = cart.filter((value) => {
      return value.id !== id;
    });
  } else {
    decreaseQuantity.quantity--;
  }
  checkEmptyCart(cart);
  renderCart(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// select by type
function selectBrands() {
  const select = getEl("#selectBrand").value;
  const selectedValue = shoeShop.filter((value) => {
    if (select === "default") {
      return value;
    } else {
      return value.type === select;
    }
  });
  renderShoe(selectedValue);
}
