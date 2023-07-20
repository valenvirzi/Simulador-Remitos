let containerDiv,
  ivaToggle,
  paidToggle,
  owesToggle,
  prevDebtToggle,
  paymentH2,
  paymentAmount,
  debtH2,
  debtAmount,
  subtotalAmount,
  ivaAmount,
  previousDebtAmount,
  totalAmount,
  btnAddProduct;
containerDiv = document.getElementById("containerDiv");
ivaToggle = document.getElementById("iva");
paidToggle = document.getElementById("paid");
owesToggle = document.getElementById("owes");
prevDebtToggle = document.getElementById("prevDebt");
paymentH2 = document.getElementById("paymentH2");
paymentAmount = document.getElementById("paymentAmount");
debtH2 = document.getElementById("debtH2");
debtAmount = document.getElementById("debtAmount");
subtotalAmount = document.getElementById("subtotalAmount");
ivaAmount = document.getElementById("ivaAmount");
previousDebtAmount = document.getElementById("previousDebtAmount");
totalAmount = document.getElementById("totalAmount");
btnAddProduct = document.getElementById("btnAddProduct");



// class Item {
//   constructor(itemQuantity, itemName, itemPrice, itemSubtotal) {
//     this.itemQuantity = itemQuantity;
//     this.itemName = itemName;
//     this.itemPrice = itemPrice;
//     itemSubtotal = this.multiply(itemQuantity, itemPrice);
//   }

//   multiply(itemQuantity, itemPrice) {
//     let itemSubtotal = itemQuantity * itemPrice;
//     return itemSubtotal;
//   }

// }

// let prod = document.createElement("div");
// prod.classList.add("main__products-div");
// prod.innerHTML = `<input class="main__products-item" 
// type="number"
// placeholder="Cantidad">
// <input class="main__products-item" 
// type="text"
// placeholder="Producto">
// <input class="main__products-item" 
// type="number"
// placeholder="Precio">
// <span class="main__products-item main__products-item-span">$</span>`;

// function addChild(prod) {
//     containerDiv.appendChild(prod);
// }

// btnAddProduct.addEventListener("click", addChild(prod))