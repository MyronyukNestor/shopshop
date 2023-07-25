let APIurl = "https://dummyjson.com/products/";

let arr;
let cardArr = [];

if (localStorage.getItem("bouth-products")) {
  cardArr = JSON.parse(localStorage.getItem("bouth-products"));
} else {
  cardArr = [];
}
//let cardArr = JSON.parse(localStorage.getItem("bouth-products"));
let category = "all";
let price = 2000;

const container = document.querySelector(".container");
const mainDiv = document.querySelector(".main-div");
const shoppingCart = document.querySelector(".shopping-cart");

// create product cards
function createProduct(element, condition) {
  if (condition) {
    const product = document.createElement("div");
    product.setAttribute("data-category", element.category);
    const productImg = document.createElement("img");
    const addToCartLink = document.createElement("a");
    addToCartLink.href =
      "./cart.html?title=" +
      element.title +
      "&price=" +
      element.price +
      "&image=" +
      element.images[0];
    const addToCart = document.createElement("img");
    addToCart.style.cursor = "pointer";
    addToCart.setAttribute("data-basket-title", element.title);
    addToCart.setAttribute("data-basket-price", element.price);
    addToCart.setAttribute("data-basket-img", element.images);
    const productName = document.createElement("p");
    const price = document.createElement("p");

    addToCart.addEventListener("click", () => {
      const title = addToCart.getAttribute("data-basket-title");
      const price = addToCart.getAttribute("data-basket-price");
      const imgs = addToCart.getAttribute("data-basket-img");

      const prodInfo = [title, price, imgs];
      cardArr.push(prodInfo);
      // щоб записати масив у локал.пам -> JSON.stringify
      //   localStorage.setItem("bouth-products", JSON.stringify(cardArr));

      // window.location.href = "file:///C:/Users/1/Documents/svitymo/shop1/cart.html";
    });

    product.classList.add("product");
    productImg.classList.add("image");
    addToCart.classList.add("add-to-card-btn");
    productName.classList.add("product-name");
    price.classList.add("price");

    productImg.src = element.images[0];
    addToCart.src = "images/icon.png";
    productName.textContent = element.title;
    price.textContent = element.price;

    product.appendChild(productImg);
    addToCartLink.appendChild(addToCart);
    product.appendChild(addToCartLink);
    product.appendChild(productName);
    product.appendChild(price);

    mainDiv.appendChild(product);
  }
} // end createProduct

// display all products and category buttons after page load
const arrCategory = [];
fetch(APIurl)
  .then((res) => res.json())
  .then((json) => {
    arr = json.products;
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];

      createProduct(element, element.title == element.title);

      if (!arrCategory.includes(element.category)) {
        arrCategory.push(element.category);
      }
    }
    for (let i = 0; i < arrCategory.length; i++) {
      const categoryElement = arrCategory[i];
      const button = document.createElement("button");
      button.id = "button-" + i;
      button.innerText = categoryElement;
      container.appendChild(button);
      button.classList.add("category-btn");

      button.addEventListener("click", (event) => {
        category = document.getElementById(event.target.id).textContent;

        const products = document.querySelectorAll(".product");

        for (let index = 0; index < products.length; index++) {
          const element = products[index];
          const children = element.children;
          const prodPrice = parseInt(children[3].textContent);

          if (category == "all") {
            if (prodPrice > parseInt(price)) {
              element.style.display = "none";
            } else {
              element.style.display = "block";
            }
          } else {
            if (
              element.getAttribute("data-category") !== category ||
              prodPrice > parseInt(price)
            ) {
              element.style.display = "none";
            } else {
              element.style.display = "block";
            }
          }
        }
      });
    }
  });

// filter products by price

const rangeInput = document.getElementById("myRange");
rangeInput.addEventListener("change", function () {
  const rangeValue = rangeInput.value;
  price = rangeValue;
  const products = document.querySelectorAll(".product");

  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    const children = element.children;
    const prodPrice = parseInt(children[3].textContent);

    if (category == "all") {
      if (prodPrice > parseInt(price)) {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    } else {
      if (
        element.getAttribute("data-category") !== category ||
        prodPrice > parseInt(price)
      ) {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    }
  }
});

// display all cathegories button

const allCategories = document.createElement("button");
allCategories.innerText = "all categories";
container.appendChild(allCategories);
allCategories.classList.add("category-btn");
allCategories.addEventListener("click", () => {
  category = "all";
  const products = document.querySelectorAll(".product");

  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    const children = element.children;
    const prodPrice = parseInt(children[3].textContent);

    if (prodPrice > parseInt(price)) {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  }
});

// shopping cart

if (cardArr.length > 0) {
  const cartIcon = document.createElement("img");
  cartIcon.classList.add("icon");
  cartIcon.src = "images/2.png";
  cartIcon.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/cart.html";
  });
  shoppingCart.appendChild(cartIcon);
} else {
  const cartIcon = document.createElement("img");
  cartIcon.classList.add("icon");
  cartIcon.src = "images/1.png";
  cartIcon.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/cart.html";
  });
  shoppingCart.appendChild(cartIcon);
}

// localStorage.clear();
