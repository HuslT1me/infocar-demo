const countries = [
    { name: "Moldova", code: "MD", phone: 373, mask: "99-999-999" },
    { name: "Austria", code: "AT", phone: 43, mask: "999-999-999[9]" },
    { name: "Belgium", code: "BE", phone: 32, mask: "99-999-9999" },
    { name: "Bulgaria", code: "BG", phone: 359, mask: "99-999-9999" },
    { name: "Czech Republic", code: "CZ", phone: 420, mask: "99-999-9999[9]" },
    { name: "Denmark", code: "DK", phone: 45, mask: "99-999-999" },
    { name: "France", code: "FR", phone: 33, mask: "999-999-999" },
    { name: "Germany", code: "DE", phone: 49, mask: "999-999-999[9][9]" },
    { name: "Greece", code: "GR", phone: 30, mask: "99-999-9999" },
    { name: "Hungary", code: "HU", phone: 36, mask: "99-999-9999" },
    { name: "Ireland", code: "IE", phone: 353, mask: "99-999-9999" },
    { name: "Israel", code: "IL", phone: 972, mask: "99-999-9999" },
    { name: "Italy", code: "IT", phone: 39, mask: "99-999-9999" },
    { name: "Latvia", code: "LV", phone: 371, mask: "99-999-9999" },
    { name: "Lithuania", code: "LT", phone: 370, mask: "99-999-9999" },
    { name: "Netherlands", code: "NL", phone: 31, mask: "99-999-9999" },
    { name: "Norway", code: "NO", phone: 47, mask: "99-999-9999" },
    { name: "Poland", code: "PL", phone: 48, mask: "99-999-9999" },
    { name: "Portugal", code: "PT", phone: 351, mask: "99-999-9999" },
    { name: "Romania", code: "RO", phone: 40, mask: "99-999-9999" },
    { name: "Slovakia", code: "SK", phone: 421, mask: "99-999-9999" },
    { name: "Slovenia", code: "SI", phone: 386, mask: "99-999-9999" },
    { name: "Spain", code: "ES", phone: 34, mask: "99-999-9999" },
    { name: "Sweden", code: "SE", phone: 46, mask: "99-999-9999" },
    { name: "Switzerland", code: "CH", phone: 41, mask: "99-999-9999" },
    { name: "Turkey", code: "TR", phone: 90, mask: "99-999-9999" },
    { name: "Ukraine", code: "UA", phone: 380, mask: "99-999-9999" },
    { name: "United Kingdom", code: "GB", phone: 44, mask: "99-999-9999[9]" },
    { name: "USA & Canada", code: "US", phone: 1, mask: "99-999-9999[9]" },
  ],
  select_box = document.querySelector(".options"),
  input_box = document.querySelector(".selected-option div strong"),
  selected_option = document.querySelector(".selected-option div"),
  prefix = document.querySelector("#prefix");

let options = null;

for (country of countries) {
  const option = `
    <li class="option">
        <div><span class="iconify" data-mask="${country.mask}" data-icon="flag:${country.code.toLowerCase()}-4x3"></span><span class="country-name">${country.name}</span></div>
        <strong>+${country.phone}</strong>
    </li> `;

  select_box.querySelector("ol").insertAdjacentHTML("beforeend", option);
  options = document.querySelectorAll(".option");
}



function selectOption(temp) {
  let context = this;
  if (temp !== null) {
    context = temp;
  }
  console.log(context);
  const icon = context.querySelector(".iconify").cloneNode(true),
    phone_code = context.querySelector("strong").cloneNode(true);
  Inputmask({ mask: context.querySelector(".iconify").dataset.mask }).mask(
    document.querySelector("#phone")
  );
  // document.querySelector('#phone').placeholder = this.querySelector('.iconify').dataset.mask.replace(/9/gi,'_');
  selected_option.innerHTML = "";
  selected_option.append(icon, " ", phone_code);
  input_box.value = phone_code.innerText;
  prefix.value = phone_code.innerText.substring(1);
  select_box.classList.remove("active");
  selected_option.classList.remove("active");
  select_box
    .querySelectorAll(".hide")
    .forEach((el) => el.classList.remove("hide"));
}
selected_option.addEventListener("click", () => {
  select_box.classList.toggle("active");
  selected_option.classList.toggle("active");
});
options.forEach((option) => option.addEventListener("click", () => selectOption(option)));
selectOption(options[0]);
