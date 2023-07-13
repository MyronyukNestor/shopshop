let APIurl = "https://dummyjson.com/products/";

let arr;

let category = "all";
let price = 2000;

const titles = document.querySelector(".titles");
const mainDiv = document.querySelector(".main-div");

// create product cards

function createProduct(element, condition) {
  if (condition) {
    const product = document.createElement("div");
    product.setAttribute("data-category", element.category);
    const productImg = document.createElement("img");
    const addToCart = document.createElement("img");
    addToCart.setAttribute("data-title", element.title);
    addToCart.setAttribute("data-price", element.price);
    addToCart.setAttribute("data-img", element.images);
    const productName = document.createElement("p");
    const price = document.createElement("p");

    addToCart.addEventListener("click", () => {
      const title = addToCart.getAttribute("data-title");
      const price = addToCart.getAttribute("data-price");
      const imgs = addToCart.getAttribute("data-img");

      const prodInfo = [title, price, imgs];

      localStorage.setItem("bought_products", JSON.stringify(prodInfo));

      window.location.href = "http://127.0.0.1:5500/cart.html";
    });

    product.classList.add("product");
    productImg.classList.add("image");
    addToCart.classList.add("add-to-card-btn");
    productName.classList.add("product-name");
    price.classList.add("price");

    productImg.src = element.images[0];
    addToCart.src = "./images/icon.png";
    productName.textContent = element.title;
    price.textContent = element.price;

    product.appendChild(productImg);
    product.appendChild(addToCart);
    product.appendChild(productName);
    product.appendChild(price);

    mainDiv.appendChild(product);
  }
}

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
      titles.appendChild(button);
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
titles.appendChild(allCategories);
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


