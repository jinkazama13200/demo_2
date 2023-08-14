let newProduct = [];
let productList = [];
let isSubmitted = false;
// DOM
const getEl = (n) => document.querySelector(n);

getProduct();

getEl("#btnThem").onclick = () => {
  getEl("#header-title").innerHTML = "Add Product";
  getEl("#btnThemSP").style.display = "block";
  getEl("#btnCapNhat").style.display = "none";
};

getEl("#btnDong").onclick = () => {
  resetForm();
};

function getProduct() {
  apiGetProducts()
    .then((res) => {
      productList = {};
      productList = res.data;
      console.log(productList);
      display(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// display
function display(products) {
  const output = products.reduce((result, value, index) => {
    const product = new Product(
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
      `
        <tr>
            <td>${index + 1}</td>       
            <td>${product.name}</td>       
            <td>${product.price.toLocaleString()}</td>       
            <td width="15%"><img src="${
              product.image
            }" width="100px" height="100%"/></td>       
            <td>${product.type}</td>       
            <td>
                <button onclick="editProduct('${
                  value.id
                }')" class="btn btn-primary" data-toggle="modal" data-target="#myModal">Edit</button>
                <button onclick="removeProduct('${
                  value.id
                }')" class="btn btn-danger">Remove</button>
            </td>       
        </tr>
    
    `
    );
  }, "");

  getEl("#tableDanhSach").innerHTML = output;
}

// add product
getEl("#btnThemSP").onclick = function addProduct() {
  isSubmitted = true;
  const product = {
    name: getEl("#name").value,
    price: getEl("#price").value,
    image: getEl("#screen").value,
    type: getEl("#hangSP").value,
    material: getEl("#material").value,
    color: getEl("#color").value,
  };
  let isCorrect = validate(product);
  if (!isCorrect) {
    return;
  }

  apiCreateProduct(product)
    .then(() => {
      $("#myModal").modal("hide");
      resetForm();
      return getProduct();
    })
    .catch((error) => {
      console.log(error);
    });
};

//remove product
function removeProduct(id) {
  apiDeleteProduct(id)
    .then(() => {
      return getProduct();
    })
    .catch((error) => {
      console.log(error);
    });
}

//edit product by finding by id
function editProduct(id) {
  getEl("#header-title").innerHTML = "Edit Product";
  getEl("#btnThemSP").style.display = "none";
  getEl("#btnCapNhat").style.display = "block";

  apiGetProductById(id)
    .then((res) => {
      newProduct = res.data;
      getEl("#name").value = newProduct.name;
      getEl("#price").value = newProduct.price;
      getEl("#screen").value = newProduct.image;
      getEl("#material").value = newProduct.material;
      getEl("#color").value = newProduct.color;
      getEl("#hangSP").value = newProduct.type;
    })
    .catch((error) => {
      console.log(error);
    });
}
// update product by finding id
function updateProduct() {
  isSubmitted = true;
  const product = {
    name: getEl("#name").value,
    price: getEl("#price").value,
    image: getEl("#screen").value,
    type: getEl("#hangSP").value,
    material: getEl("#material").value,
    color: getEl("#color").value,
  };
  const isCorrect = validate(product);
  if (!isCorrect) return;

  apiUpdateProduct(newProduct.id, product)
    .then(() => {
      $("#myModal").modal("hide");
      resetForm();
      return getProduct();
    })
    .catch((error) => {
      console.log(error);
    });
}

// reset form
function resetForm() {
  isSubmitted = false;
  getEl("#name").value = "";
  getEl("#price").value = "";
  getEl("#screen").value = "";
  getEl("#hangSP").value = "";
  getEl("#material").value = "";
  getEl("#color").value = "";

  getEl("#tbName").innerHTML = "";
  getEl("#tbPrice").innerHTML = "";
  getEl("#tbImage").innerHTML = "";
  getEl("#tbMaterial").innerHTML = "";
  getEl("#tbColor").innerHTML = "";
  getEl("#tbType").innerHTML = "";
}

// search by oninput
getEl("#search").onkeydown = (e) => {
  if (e.key !== "Enter") {
    return;
  } else {
    let search = e.target.value;
    const findProduct = productList.filter((value) => {
      const newProduct = value.name.trim().toLowerCase();
      return newProduct.includes(search);
    });
    display(findProduct);
  }
};
// search by onclick
function searchProd() {
  let search = getEl("#search").value;
  search = search.trim().toLowerCase();
  const findProduct = productList.filter((value) => {
    const newProduct = value.name.trim().toLowerCase();
    return newProduct.includes(search);
  });
  display(findProduct);
}

function orderBy() {
  const sort = productList.sort((a, b) => {
    return parseInt(a.price) - parseInt(b.price);
  });
  getEl("#SapXepTang").style.display = "none";
  getEl("#SapXepGiam").style.display = "block";
  display(sort);
}

function orderByDesc() {
  const sort = productList.sort((a, b) => {
    return parseInt(b.price) - parseInt(a.price);
  });
  getEl("#SapXepGiam").style.display = "none";
  getEl("#SapXepTang").style.display = "block";
  display(sort);
}

// check trim value
function isRequired(value) {
  if (!value.trim()) {
    return false;
  }
  return true;
}

//check number
function isNumber(value) {
  if (isNaN(value)) {
    return false;
  }
  return true;
}

// validate
function validate(input) {
  let flag = true;
  // name
  if (!isRequired(input.name)) {
    flag = false;
    getEl("#tbName").innerHTML = "(*) This Field Is Empty.";
    getEl("#tbName").style.display = "block";
  }
  //price
  if (!isRequired(input.price)) {
    flag = false;
    getEl("#tbPrice").innerHTML = "(*) This Field Is Empty.";
    getEl("#tbPrice").style.display = "block";
  } else if (!isNumber(input.price)) {
    flag = false;
    getEl("#tbPrice").innerHTML = "(*) Must Be A Number.";
    getEl("#tbPrice").style.display = "block";
  }
  //image
  if (!isRequired(input.image)) {
    flag = false;
    getEl("#tbImage").innerHTML = "(*) This Field Is Empty.";
    getEl("#tbImage").style.display = "block";
  }

  //Material
  if (!isRequired(input.material)) {
    flag = false;
    getEl("#tbMaterial").innerHTML = "(*) This Field Is Empty.";
    getEl("#tbMaterial").style.display = "block";
  }

  //color
  if (!isRequired(input.color)) {
    flag = false;
    getEl("#tbColor").innerHTML = "(*) This Field Is Empty.";
    getEl("#tbColor").style.display = "block";
  }

  //type
  if (!isRequired(input.type)) {
    flag = false;
    getEl("#tbType").innerHTML = "(*) This Field Is Empty.";
    getEl("#tbType").style.display = "block";
  }

  return flag;
}

// oninput
// name
getEl("#name").oninput = (e) => {
  if (!isSubmitted) return;
  if (e.target.value) {
    getEl("#tbName").innerHTML = "";
  } else {
    getEl("#tbName").innerHTML = "(*) This Field Is Empty.";
    getEl("#tbName").style.display = "block";
  }
};

//price
getEl("#price").oninput = (e) => {
  if (!isSubmitted) return;
  if (e.target.value) {
    getEl("#tbPrice").innerHTML = "";
  } else {
    getEl("#tbPrice").innerHTML = "(*) This Field Is Empty.";
    getEl("#tbPrice").style.display = "block";
  }
};

//image
getEl("#screen").oninput = (e) => {
  if (!isSubmitted) return;
  if (e.target.value) {
    getEl("#tbImage").innerHTML = "";
  } else {
    getEl("#tbImage").innerHTML = "(*) This Field Is Empty.";
    getEl("#tbImage").style.display = "block";
  }
};

//material
getEl("#material").oninput = (e) => {
  if (!isSubmitted) return;
  if (e.target.value) {
    getEl("#tbMaterial").innerHTML = "";
  } else {
    getEl("#tbMaterial").innerHTML = "(*) This Field Is Empty.";
    getEl("#tbMaterial").style.display = "block";
  }
};

//color
getEl("#color").oninput = (e) => {
  if (!isSubmitted) return;
  if (e.target.value) {
    getEl("#tbColor").innerHTML = "";
  } else {
    getEl("#tbColor").innerHTML = "(*) This Field Is Empty.";
    getEl("#tbColor").style.display = "block";
  }
};

//type
getEl("#hangSP").oninput = (e) => {
  if (!isSubmitted) return;
  if (e.target.value) {
    getEl("#tbType").innerHTML = "";
  } else {
    getEl("#tbType").innerHTML = "(*) This Field Is Empty.";
    getEl("#tbType").style.display = "block";
  }
};
