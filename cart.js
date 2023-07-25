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

const title = params.title;
const price = params.price;
const image = params.image;

const newProduct = [title, price, image];

const yourCards = document.querySelector(".your-cards");
let parseCard = [];
if (localStorage.getItem("bouth-products")) {
  let storageCard = localStorage.getItem("bouth-products");
  parseCard = JSON.parse(storageCard);
  if (newProduct[0] !== undefined) {
    parseCard.push(newProduct);
    localStorage.setItem("bouth-products", JSON.stringify(parseCard));
  }
} else {
  if (newProduct[0] !== undefined) {
    parseCard.push(newProduct);
    localStorage.setItem("bouth-products", JSON.stringify(parseCard));
  }
}

for (let index = 0; index < parseCard.length; index++) {
  const element = parseCard[index];

  const product = document.createElement("div");
  const productImg = document.createElement("img");
  const productName = document.createElement("p");
  const price = document.createElement("p");
  const images = document.createElement("div");

  product.classList.add("product");
  productImg.classList.add("image");
  images.classList.add("images");
  productName.classList.add("product-name");
  price.classList.add("price");

  let arrCardImg = element[2];
  let firstImg = arrCardImg.split(",");

  for (let index = 0; index < firstImg.length; index++) {
    const image = document.createElement("img");
    image.src = firstImg[index];
    images.appendChild(image);
  }

  productImg.src = firstImg[0];
  productName.textContent = element[0];
  price.textContent = element[1];

  product.appendChild(productImg);
  product.appendChild(images);
  product.appendChild(productName);
  product.appendChild(price);

  yourCards.appendChild(product);
}

// slider

const images = document.querySelectorAll(".images");

const sliderImages = images[0].children;

let index = 0;

setInterval(() => {
  sliderImages[index].style.display = "block";
  index++;
}, 2000);
