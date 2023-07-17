// Get the current URL
var url = new URL(window.location.href);

// Get the search parameters from the URL
var searchParams = new URLSearchParams(url.search);

// Create an empty object to store the parameters
var params = {};

// Iterate over each parameter and store it in the object
for (let param of searchParams.entries()) {
  var key = param[0];
  var value = param[1];
  params[key] = value;
}

// Now you can access the parameters using the params object
// console.log(params);

const title = params.title;
const price = params.price;
const image = params.image;

const newProduct = [title, price, image];

const yourCards = document.querySelector(".your-cards");
let parseCard = [];
if (localStorage.getItem("bouth-products")) {
  let storageCard = localStorage.getItem("bouth-products");
  parseCard = JSON.parse(storageCard);
  parseCard.push(newProduct);
  console.log(parseCard);
  localStorage.setItem("bouth-products", JSON.stringify(parseCard));
} else {
  parseCard.push(newProduct);
  localStorage.setItem("bouth-products", JSON.stringify(parseCard));
}

for (let index = 0; index < parseCard.length; index++) {
  const element = parseCard[index];

  const product = document.createElement("div");
  const productImg = document.createElement("img");
  const productName = document.createElement("p");
  const price = document.createElement("p");

  product.classList.add("product");
  productImg.classList.add("image");
  productName.classList.add("product-name");
  price.classList.add("price");

  let arrCardImg = element[2];
  let firstImg = arrCardImg.split(",");
  console.log(firstImg);

  //
  productImg.src = firstImg[0];
  productName.textContent = element[0]; //
  price.textContent = element[1]; //

  product.appendChild(productImg);
  product.appendChild(productName);
  product.appendChild(price);

  yourCards.appendChild(product);
}
