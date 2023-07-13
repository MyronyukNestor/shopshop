const storageData = sessionStorage.getItem("bought_products");
if (storageData) {
  const [storageCard, storagePrice] = JSON.parse(storageData);

  const product = document.createElement("div");
  const productName = document.createElement("p");
  const price = document.createElement("p");

  product.classList.add("product");
  productName.classList.add("product-name");
  price.classList.add("price");

  productName.textContent = storageCard;
  price.textContent = storagePrice;

  product.appendChild(productName);
  product.appendChild(price);

  document.querySelector("body").appendChild(product);
}
