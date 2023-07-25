const itemContainerDiv = document.getElementById("itemContainerDiv");
const ivaToggle = document.getElementById("iva");
const paidToggle = document.getElementById("paid");
const owesToggle = document.getElementById("owes");
const prevDebtToggle = document.getElementById("prevDebt");
const paymentH2 = document.getElementById("paymentH2");
const paymentAmount = document.getElementById("paymentAmount");
const owesH2 = document.getElementById("owesH2");
const owesAmount = document.getElementById("owesAmount");
const subtotalAmount = document.getElementById("subtotalAmount");
const ivaAmount = document.getElementById("ivaAmount");
const prevDebtAmount = document.getElementById("prevDebtAmount");
const totalAmount = document.getElementById("totalAmount");
const btnAddProduct = document.getElementById("btnAddProduct");
const subtotalDisplay = document.querySelectorAll(".subtotal");
const ivaDisplay = document.querySelectorAll(".iva");
const prevDebtDisplay = document.querySelectorAll(".prevDebt");
const accountSection = document.querySelector(".main__account");

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
</span>
`;

document.addEventListener("DOMContentLoaded", function () {

  function toggleDisplayAccount() {
    if (paidToggle.checked) {
      accountSection.classList.remove("d-none");
      paymentH2.classList.remove("d-none");
      paymentAmount.innerText = Number(prompt("Ingrese el monto pagado:"));
      if (Number(paymentAmount.innerText) < Number(totalAmount.innerText)) {
        owesH2.classList.remove("d-none");
        owesAmount.innerText = (Number(totalAmount.innerText) - Number(paymentAmount.innerText));
      }
    } else if (owesToggle.checked) {
      accountSection.classList.remove("d-none");
      owesH2.classList.remove("d-none");
      owesAmount.innerText = Number(totalAmount.innerText);
    } else {
      accountSection.classList.add("d-none");
    }
  }

  paidToggle.addEventListener("change", toggleDisplayAccount);
  owesToggle.addEventListener("change", toggleDisplayAccount);

  itemContainerDiv.innerHTML = newItem.innerHTML;

  function toggleDisplayIva() {
    if (ivaToggle.checked) {
      subtotalDisplay.forEach((element) => element.classList.remove("d-none"));
      ivaDisplay.forEach((element) => element.classList.remove("d-none"));
      ivaAmount.innerText = Number(subtotalAmount.innerText) * 0.21;
    } else if (prevDebtToggle.checked) {
      ivaDisplay.forEach((element) => element.classList.add("d-none"));
    } else {
      subtotalDisplay.forEach((element) => element.classList.add("d-none"));
      ivaDisplay.forEach((element) => element.classList.add("d-none"));
    }
  }

  function toggleDisplayPrevDebt() {
    if (prevDebtToggle.checked) {
      subtotalDisplay.forEach((element) => element.classList.remove("d-none"));
      prevDebtDisplay.forEach((element) => element.classList.remove("d-none"));
      prevDebtAmount.innerText = Number(prompt("Ingrese el saldo anterior:"));
    } else if (ivaToggle.checked) {
      prevDebtDisplay.forEach((element) => element.classList.add("d-none"));
    } else {
      subtotalDisplay.forEach((element) => element.classList.add("d-none"));
      prevDebtDisplay.forEach((element) => element.classList.add("d-none"));
    }
  }

  ivaToggle.addEventListener("change", toggleDisplayIva);
  prevDebtToggle.addEventListener("change", toggleDisplayPrevDebt);
});

btnAddProduct.addEventListener(`pointerdown`, function (e) {
  itemContainerDiv.innerHTML += newItem.innerHTML;
});
