import { menuArray } from "./data.js";

const itemDisplay = document.querySelector(".item-display");
const checkOuts = document.querySelector(".checkout-group");
const paymentModal = document.querySelector(".payment-modal");
const paymentForm = document.getElementById("payment-form");

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

let cartItems = [];
function addToCart(itemId) {
  document.querySelector(".checkout-section").style.display = "block";

  const food = menuArray.filter(function (menuItem) {
    return menuItem.id == itemId;
  })[0];

  cartItems.push({
    id: food.id,
    name: food.name,
    price: food.price,
  });

  updateCartDisplay();
}

function updateCartDisplay() {
  let checkOutData = ``;
  let totalPrice = 0;
  cartItems.forEach(function (item) {
    checkOutData += `
      <div class="checkout-items-container">
      <div class="checkout-details" id="checkout-${item.id}">
        <div class="checkout-item">
          ${item.name}
        </div>
        <div class="delete" data-remove="checkout-${item.id}"> remove </div>
    
      </div>
      <div class="cost"> ${item.price} </div>
    </div>
      `;

    totalPrice += item.price;
  });

  checkOuts.innerHTML = checkOutData;
  document.getElementById("total-amount").textContent = totalPrice;
}

function removeFromCart(itemId) {
  console.log("remove clicked");

  itemId = parseInt(itemId.substring("checkout-".length));

  const clickedItem = cartItems.filter(function (foodItem) {
    return foodItem.id == itemId;
  });

  cartItems = cartItems.filter(function (elementsInCart) {
    return elementsInCart !== clickedItem[0];
  });

  updateCartDisplay();
}

function checkOut() {
  paymentModal.style.display = "block";
  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const paymentFormData = new FormData(paymentForm);
    const customerName = paymentFormData.get("customerName");
    paymentModal.style.display = "none";
    document.querySelector(".checkout-section").style.display = "none";
    document.getElementById("confirmation-note").style.display = "block";
    document.getElementById(
      "confirmation-note"
    ).innerHTML = `<p> Thanks, ${customerName}! Your order is on its way! </p>`;
  });
}

document.addEventListener("click", function (e) {
  if (e.target.dataset.id) {
    addToCart(e.target.dataset.id);
  } else if (e.target.dataset.remove) {
    removeFromCart(e.target.dataset.remove);
  } else if (e.target.dataset.purchase) {
    checkOut();
  }
});

displayMenuItems();
