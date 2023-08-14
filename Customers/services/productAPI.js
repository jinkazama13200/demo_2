function apiGetProducts() {
  return axios({
    url: "https://64d0c7c9ff953154bb7973f1.mockapi.io/products",
    method: "GET",
  });
}

function apiGetProductById(productId) {
  return axios({
    url: `https://64d0c7c9ff953154bb7973f1.mockapi.io/products${productId}`,
    method: "GET",
  });
}
