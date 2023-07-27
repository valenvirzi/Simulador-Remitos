const colorPicker = document.getElementById("colorPicker");
const itemContainerForm = document.getElementById("itemContainerForm");
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
let subtotalArray = [];

function applyThemeColor() {
  const selectedColor = colorPicker.value;
  const textStyling = document.getElementsByClassName('textColor');
  document.body.style.color = selectedColor;
  for (const element of textStyling) {
    element.style.color = selectedColor;
  }
  const storedColor = {
    color: selectedColor,
  };
  localStorage.setItem("storedColor", JSON.stringify(storedColor));
}

colorPicker.addEventListener("change", () => {
  applyThemeColor();
});

const newItem = document.createElement("div");
newItem.classList.add("main__products-div");
newItem.innerHTML = `
<input 
  class="main__products-item itemQuantity" 
  type="number"
  placeholder="Cantidad">
<input 
  class="main__products-item itemName" 
  type="text"
  placeholder="Producto">
<input 
  class="main__products-item itemPrice" 
  type="number"
  placeholder="Precio">
<span class="main__products-item itemSubtotal main__products-item-span">
</span>
`;

document.addEventListener("DOMContentLoaded", function () {
  const storedTextColor = localStorage.getItem("storedColor");
  const parsedTextColor = JSON.parse(storedTextColor);
  if (parsedTextColor) {
    colorPicker.value = parsedTextColor.color;
    applyThemeColor();
  }

  function toggleDisplayAccount() {
    if (paidToggle.checked) {
      accountSection.classList.remove("d-none");
      paymentH2.classList.remove("d-none");
      paymentAmount.innerText = Number(prompt("Ingrese el monto pagado:"));
      if (Number(paymentAmount.innerText) < Number(totalAmount.innerText)) {
        owesH2.classList.remove("d-none");
        owesAmount.innerText =
          Number(totalAmount.innerText) - Number(paymentAmount.innerText);
      } else {
        owesAmount.innerText = 0;
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
  paidToggle.addEventListener("change", totalCalculation);
  owesToggle.addEventListener("change", toggleDisplayAccount);
  owesToggle.addEventListener("change", totalCalculation);

  itemContainerForm.innerHTML = newItem.innerHTML;

  function toggleDisplayIva() {
    if (ivaToggle.checked) {
      subtotalDisplay.forEach((element) => element.classList.remove("d-none"));
      ivaDisplay.forEach((element) => element.classList.remove("d-none"));
      ivaAmount.innerText = Math.ceil(Number(subtotalAmount.innerText) * 0.21);
    } else if (prevDebtToggle.checked) {
      ivaDisplay.forEach((element) => element.classList.add("d-none"));
      ivaAmount.innerHTML = 0;
    } else {
      subtotalDisplay.forEach((element) => element.classList.add("d-none"));
      ivaDisplay.forEach((element) => element.classList.add("d-none"));
      ivaAmount.innerHTML = 0;
    }
  }

  function toggleDisplayPrevDebt() {
    if (prevDebtToggle.checked) {
      subtotalDisplay.forEach((element) => element.classList.remove("d-none"));
      prevDebtDisplay.forEach((element) => element.classList.remove("d-none"));
      prevDebtAmount.innerText = Number(prompt("Ingrese el saldo anterior:"));
    } else if (ivaToggle.checked) {
      prevDebtDisplay.forEach((element) => element.classList.add("d-none"));
      prevDebtAmount.innerHTML = 0;
    } else {
      subtotalDisplay.forEach((element) => element.classList.add("d-none"));
      prevDebtDisplay.forEach((element) => element.classList.add("d-none"));
      prevDebtAmount.innerHTML = 0;
    }
  }

  let btnPressCounter = 0;

  function itemSubtotalCalculation(btnPressCounter) {
    const itemSubtotalNodeList = document.querySelectorAll(".itemSubtotal");
    const itemSubtotal = Array.from(itemSubtotalNodeList);
    const itemQuantityNodeList = document.querySelectorAll(".itemQuantity");
    const itemPriceNodeList = document.querySelectorAll(".itemPrice");
    itemSubtotalNodeList[btnPressCounter].innerHTML = Math.ceil(
      Number(
        itemQuantityNodeList[btnPressCounter].valueAsNumber *
          itemPriceNodeList[btnPressCounter].valueAsNumber
      )
    );
    let total = 0;
    itemSubtotal.forEach((subtotal) => {
      total += Number(subtotal.innerHTML);
    });
    subtotalAmount.innerText = total;
  }

  function totalCalculation() {
    totalAmount.innerText = Math.ceil(
      Number(subtotalAmount.innerHTML) +
        Number(ivaAmount.innerHTML) +
        Number(prevDebtAmount.innerHTML)
    );
  }

  function addProduct() {
    itemContainerForm.appendChild(newItem.cloneNode(true));
  }

  ivaToggle.addEventListener("change", toggleDisplayIva);
  ivaToggle.addEventListener("change", totalCalculation);
  prevDebtToggle.addEventListener("change", toggleDisplayPrevDebt);
  prevDebtToggle.addEventListener("change", totalCalculation);

  btnAddProduct.addEventListener(`pointerdown`, function (e) {
    const itemQuantityNodeList = document.querySelectorAll(".itemQuantity");
    const itemQuantity = Array.from(itemQuantityNodeList);
    const itemPriceNodeList = document.querySelectorAll(".itemPrice");
    const itemPrice = Array.from(itemPriceNodeList);
    console.log(itemQuantity);
    console.log(itemQuantity.map((item) => item.valueAsNumber));
    let itemQuantityArray = itemQuantity.map((item) => item.valueAsNumber);
    let itemPriceArray = itemPrice.map((item) => item.valueAsNumber);
    subtotalArray = itemQuantityArray.map(
      (value, index) => value * itemPriceArray[index]
    );
    addProduct();
    itemSubtotalCalculation(btnPressCounter);
    btnPressCounter++;
    totalCalculation();
  });
});
