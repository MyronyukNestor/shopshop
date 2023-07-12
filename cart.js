const storageCard = localStorage.getItem("category");
const storagePrice = localStorage.getItem("price");

const product = document.createElement("div");
// const productImg = document.createElement("img");
const productName = document.createElement("p");
const price = document.createElement("p");

product.classList.add("product");
// productImg.classList.add("image");
productName.classList.add("product-name");
price.classList.add("price");

// productImg.src = element.images[0];
productName.textContent = storageCard;
price.textContent = storagePrice;

// product.appendChild(productImg);
product.appendChild(productName);
product.appendChild(price);

document.querySelector("body").appendChild(product);
