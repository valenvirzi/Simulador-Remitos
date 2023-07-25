const itemContainerDiv = document.getElementById("itemContainerDiv");
const ivaToggle = document.getElementById("iva");
const paidToggle = document.getElementById("paid");
const owesToggle = document.getElementById("owes");
const prevDebtToggle = document.getElementById("prevDebt");
const paymentH2 = document.getElementById("paymentH2");
const paymentAmount = document.getElementById("paymentAmount");
const debtH2 = document.getElementById("debtH2");
const debtAmount = document.getElementById("debtAmount");
const subtotalAmount = document.getElementById("subtotalAmount");
const ivaAmount = document.getElementById("ivaAmount");
const previousDebtAmount = document.getElementById("previousDebtAmount");
const totalAmount = document.getElementById("totalAmount");
const btnAddProduct = document.getElementById("btnAddProduct");
const subtotalDisplay = document.querySelectorAll(".subtotal");
const ivaDisplay = document.querySelectorAll(".iva");
const previousDebtDisplay = document.querySelectorAll(".previousDebt");

const newItem = document.createElement("div");
newItem.classList.add("main__products-div");
newItem.innerHTML = `
<input 
  class="main__products-item" 
  type="number"
  placeholder="Cantidad">
<input 
  class="main__products-item" 
  type="text"
  placeholder="Producto">
<input 
  class="main__products-item" 
  type="number"
  placeholder="Precio">
<span class="main__products-item main__products-item-span">
  $
</span>
`;

document.addEventListener("DOMContentLoaded", function () {
  itemContainerDiv.innerHTML = newItem.innerHTML;

  function toggleDisplayIva() {
    if (ivaToggle.checked) {
      ivaDisplay.forEach((element) => element.classList.remove("d-none"));
      subtotalDisplay.forEach((element) => element.classList.remove("d-none"));
    } else if (prevDebtToggle.checked) {
      ivaDisplay.forEach((element) => element.classList.add("d-none"));
    } else {
      ivaDisplay.forEach((element) => element.classList.add("d-none"));
      subtotalDisplay.forEach((element) => element.classList.add("d-none"));
    }
  }

  function toggleDisplayPrevDebt() {
    if (prevDebtToggle.checked) {
      previousDebtDisplay.forEach((element) =>
        element.classList.remove("d-none")
      );
      subtotalDisplay.forEach((element) => element.classList.remove("d-none"));
    } else if (ivaToggle.checked) {
      previousDebtDisplay.forEach((element) => element.classList.add("d-none"));
    } else {
      previousDebtDisplay.forEach((element) => element.classList.add("d-none"));
      subtotalDisplay.forEach((element) => element.classList.add("d-none"));
    }
  }

  ivaToggle.addEventListener("change", toggleDisplayIva);
  prevDebtToggle.addEventListener("change", toggleDisplayPrevDebt);
});

btnAddProduct.addEventListener(`pointerdown`, function (e) {
  itemContainerDiv.innerHTML += newItem.innerHTML;
});
