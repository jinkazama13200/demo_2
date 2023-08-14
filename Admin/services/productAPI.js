function apiGetProducts(searchInput) {
  return axios({
    url: "https://64d0c7c9ff953154bb7973f1.mockapi.io/products",
    method: "GET",
    params: {
      name: searchInput,
    },
  });
}

function apiGetProductById(productId) {
  return axios({
    url: `https://64d0c7c9ff953154bb7973f1.mockapi.io/products/${productId}`,
    method: "GET",
  });
}

function apiCreateProduct(product) {
  return axios({
    url: "https://64d0c7c9ff953154bb7973f1.mockapi.io/products",
    method: "POST",
    data: product,
  });
}

function apiUpdateProduct(productId, newProduct) {
  return axios({
    url: `https://64d0c7c9ff953154bb7973f1.mockapi.io/products/${productId}`,
    method: "PUT",
    data: newProduct,
  });
}

function apiDeleteProduct(productId) {
  return axios({
    url: `https://64d0c7c9ff953154bb7973f1.mockapi.io/products/${productId}`,
    method: "DELETE",
  });
}
