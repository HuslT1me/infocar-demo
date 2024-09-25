// Получаем элементы формы и кнопки
let vin = document.querySelector("#vin");
let gn = document.querySelector("#gn");
let btn = document.querySelector("#vin_btn");

let vinRegex = /^[ABCDEFGHJKLMNOPRSTUVWXYZabcdefghjklmnprstuvwxyz0-9]{1,17}$/;
let gnRegex = /^[A-Z]{3,4}\d{1,3}$/;
let gnLettersRegex = /^[A-Z]{3,4}$/;
let gnNumbersRegex = /^\d{1,3}$/;

const _checkGnLetters = {
  1: (val) => /[A-Z]/.test(val[0]),
  2: (val) => /[A-Z]/.test(val[0]) && /[A-Z]/.test(val[1]),
  3: (val) =>
    /[A-Z]/.test(val[0]) && /[A-Z]/.test(val[1]) && /[A-Z]/.test(val[2]),
  4: (val) =>
    /[A-Z]/.test(val[0]) &&
    /[A-Z]/.test(val[1]) &&
    /[A-Z]/.test(val[2]) &&
    /[A-Z\s]/.test(val[3]),
};
const _checkGnNumbers = {
  1: (val) => /[0-9]/.test(val[0]),
  2: (val) => /[0-9]/.test(val[0]) && /[0-9]/.test(val[1]),
  3: (val) =>
    /[0-9]/.test(val[0]) && /[0-9]/.test(val[1]) && /[0-9]/.test(val[2]),
};

const checkGnLetters = (val) => {
  if (!val || val.length > 4 || (val.length > 3 && val.slice(-1) === " ")) {
    document.getElementById("gn_letters").blur();
    document.getElementById("gn_numbers").focus();
    return false;
  }
  return _checkGnLetters[val.length](val);
};

const checkGnNumbers = (val) => {
  if (!val || val.length > 3) {
    return false;
  }
  return _checkGnNumbers[val.length](val);
};

// Обработчики событий для ввода
document.querySelector("#vin").addEventListener("keyup", function (e) {
  inputHandler(
    e.target,
    (val) => {
      return vinRegex.test(val);
    },
    17
  );
});

document.querySelector("#gn_letters").addEventListener("keyup", function (e) {
  inputHandler(e.target, checkGnLetters);
});

document.querySelector("#gn_numbers").addEventListener("keyup", function (e) {
  inputHandler(e.target, checkGnNumbers);
});

// Обработчик ввода
function inputHandler(target, callback, maxLength) {
  target.value = target.value.toUpperCase();
  if (!callback(target.value)) {
    target.value = target.value.slice(0, -1);
  }
  target.value = target.value.slice(0, maxLength);
}
