import { menuArray } from "./data.js";

const itemDisplay = document.querySelector(".item-display");
const checkOuts = document.querySelector(".checkout-group");

let menuItemsHtml = ``;
function displayMenuItems() {
  menuArray.forEach((menuItem) => {
    const { name, ingredients, id, price, emoji } = menuItem;
    const ingredient = ingredients.join(",");

    menuItemsHtml += `
    <div class="item" id="${id}">
              <div class="item-graphic">
              ${emoji}
            </div>
            <div class="item-description">
              <h2> ${name} </h2>
              <p class="ingredients"> ${ingredient} </p>
              <p class="cost"> ${price} </p>
            </div> 
         
            <div class="add-btn" data-id="${id}">
              +
            </div> 
    </div>
    `;
  });

  itemDisplay.innerHTML = menuItemsHtml;
}

let orderArray = [];

function addToCart(itemId) {
  document.querySelector(".checkout-section").style.display = "block";

  const food = menuArray.filter(function (menuItem) {
    return menuItem.id == itemId;
  })[0];

  orderArray.push(food.price);

  checkOuts.innerHTML += `
  <div class="checkout-items-container">
  <div class="checkout-details">
    <div class="checkout-item">
      ${food.name}
    </div>
    <div class="delete"> remove </div>
    
  </div>
  <div class="cost"> ${food.price} </div>  
</div>
  `;

  const totalPrice = orderArray.reduce((total, currentPrice) => {
    return total + currentPrice;
  });

  document.getElementById("total-amount").textContent = totalPrice;
}

document.addEventListener("click", function (e) {
  if (e.target.dataset.id) {
    addToCart(e.target.dataset.id);
  }
});

displayMenuItems();
