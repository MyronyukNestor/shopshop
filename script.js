// const rangeInput = document.getElementById("#myRange");
const btn1 = document.querySelector(".btn1");
const mainDiv = document.querySelector(".main-div");
const titles = document.querySelector(".titles");

let APIurl = "https://dummyjson.com/products/";

let arr;

fetch(APIurl)
  .then((res) => res.json())
  .then((json) => {
    arr = json.products;
    let categories = [];
    for (let i = 0; i < arr.length; i++) {
      const product = arr[i];
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    }

    for (let i = 0; i < categories.length; i++) {
      const element = categories[i];
      const buttonsCategories = document.createElement("button");
      buttonsCategories.classList = "buttonsCategories";
      buttonsCategories.id = "button-" + i;
      buttonsCategories.innerText = element;
      titles.appendChild(buttonsCategories);
      buttonsCategories.addEventListener("click", (e) => {
        let category = document.getElementById(e.target.id).textContent;
        mainDiv.innerHTML = "";

        fetch(APIurl)
          .then((res) => res.json())
          .then((json) => {
            arr = json.products;

            for (let index = 0; index < arr.length; index++) {
              const element = arr[index];
              if (element.category == category) {
                const product = document.createElement("div");
                const productImg = document.createElement("img");
                const addToCart = document.createElement("img");
                const productName = document.createElement("p");
                const price = document.createElement("p");

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
          });
      });
    }

    allProduct();

  });

const allProduct = () => {
  fetch(APIurl)
    .then((res) => res.json())
    .then((json) => {
      arr = json.products;
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        console.log(element);
        const product = document.createElement("div");
        const productImg = document.createElement("img");
        const addToCart = document.createElement("img");
        const productName = document.createElement("p");
        const price = document.createElement("p");

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
    });
};

btn1.addEventListener("click", () => {
  mainDiv.innerHTML = "";
  allProduct();
});
