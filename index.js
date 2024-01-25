import { menuArray } from "./data.js";

const itemDisplay = document.querySelector(".item-display");

let menuItemsHtml = ``;
function displayMenuItems() {
  menuArray.forEach(function (menuItem) {
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
         
            <div class="add-btn">
              +
            </div> 
            </div>
    `;
  });

  itemDisplay.innerHTML = menuItemsHtml;
}

displayMenuItems();
