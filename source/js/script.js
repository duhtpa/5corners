const $formsGoods = document.querySelectorAll(".basket__list .form-good");
const $formOrder = document.querySelector(".form-order");

const Field = {
  INCORRECT: "#D92C2C",
  CORRECT: "#007E06",
  TEXT: "#000000",
  ACTIVE: "#6e6e6e",
  INACTIVE: "#C8C8C8",
};

let formDataGeneral = new FormData();
let formDataOrder = new FormData($formOrder);

function getFormData(collection) {
  collection.forEach((it, i) => {
    let formData = new FormData(it);
    appendFormData(formData);
  });

  appendFormData(formDataOrder);
}

function appendFormData(formData) {
  let data = [...formData];

  data.forEach((it, i) => {
    formDataGeneral.append(i, it);
  });
}

function convertFormDataToObject() {
  let arr = [...formDataGeneral];
  let objForConsole = {};

  arr.forEach((it, i) => {
    let param = it[1];
    objForConsole[i] = param.replace(",", ": ");
    console.log(objForConsole[i]);
  });

  return objForConsole;
}

getFormData($formsGoods);

convertFormDataToObject();

// -----------валидация на ошибки ввода контактов-----------
const $contacts = document.querySelectorAll(".contacts__item");

$contacts.forEach((node) => {
  let field = node.querySelector("input, textarea");
  let label = node.querySelector("label");

  field.addEventListener("input", () => {
    let valueLength = field.value.length;

    if (field.validity.valid === false) {
      field.style.borderColor = Field.INCORRECT;
      label.style.color = Field.INCORRECT;
      if (field.value.length > 0) {
        label.style.display = "block";
      } else {
        label.style.display = "none";
      }
    } else {
      field.style.borderColor = Field.TEXT;
      label.style.color = Field.ACTIVE;
    }
  });
});

// -------------проверка промо-кода----------------------
const $fieldPromocode = document.querySelector(".promo .text-field");
const $messagePromoAccept = document.querySelector(".promo__accept");
const $btnAccept = document.querySelector(".promo__btn-accept");

let mockCode = "1B6D9FC";

$fieldPromocode.addEventListener("input", () => {
  if ($fieldPromocode.value.length > 0) {
    console.log("+");
    $fieldPromocode.style.borderColor = Field.ACTIVE;
    $btnAccept.style.display = "block";
  } else {
    $fieldPromocode.style.borderColor = Field.INACTIVE;
    $btnAccept.style.display = "none";
  }
});

function btnClickHandler(fieldColor, messageColor = fieldColor, messageText) {
  $btnAccept.style.display = "none";
  $messagePromoAccept.style.display = "block";

  $fieldPromocode.style.borderColor = fieldColor;
  $messagePromoAccept.style.color = messageColor;

  $fieldPromocode.style.marginBottom = "8px";
  $messagePromoAccept.style.marginBottom = "8px";

  $messagePromoAccept.textContent = `${$fieldPromocode.value.toUpperCase()} - ${messageText}`;
  $fieldPromocode.value = "";
}

$btnAccept.addEventListener("click", () => {
  if ($fieldPromocode.value !== mockCode) {
    btnClickHandler(Field.INCORRECT, undefined, "купон не найден");
  } else {
    btnClickHandler("#C8C8C8", Field.CORRECT, "купон применен");
  }
});

let navWrapper = document.querySelector(".nav__wrapper");
let navToggle = document.querySelector(".nav__toggle");

navToggle.addEventListener("click", () => {
  navWrapper.classList.toggle("visually-hidden");
});
