document.addEventListener("DOMContentLoaded", () => {
  // Кнопка скроллинга вверх
  const languageLinks = document.querySelectorAll(".nav-language");
  const passwordEyeButton = document.querySelector(
    ".password__input-pass-control"
  );
  const passwordInput = document.querySelector(".input--password");
  const restoreBlock = document.querySelector("#forgot");
  const burgerButtonWrapper = document.querySelector(".header__burger-wrapper");
  const burgerButton = document.querySelector(".header__burger-btn");
  const mainWrapper = document.querySelector(".wrapper__main-content");
  const restoreButton = document.querySelector(".button--restore");

  // Глазик на пароль
  if (passwordInput) {
    passwordEyeButton.addEventListener("click", () => {
      if (passwordInput.getAttribute("type") === "password") {
        passwordInput.setAttribute("type", "text");
        passwordEyeButton.classList.add("view");
      } else {
        passwordInput.setAttribute("type", "password");
        passwordEyeButton.classList.remove("view");
      }
    });

    passwordInput.addEventListener("focus", () =>
      restoreBlock.classList.add("view")
    );
  }

  // Переключатель языка
  languageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target;
      const lng = target.dataset.lng;

      if (target && lng) {
        document.cookie = `language=${lng}; Path=/;`;
        location.reload();
      }
    });
  });

  // Burger menu
  burgerButtonWrapper.addEventListener("click", toggleBurgerMenu);

  function toggleBurgerMenu() {
    if (mainWrapper.classList.contains("burger-active")) {
      closeBurgerMenu();
    } else {
      openBurgerMenu();
    }
  }

  function openBurgerMenu() {
    mainWrapper.classList.add("burger-active");
    burgerButton.classList.add("is-active");
    document.body.style.overflow = "hidden";
  }

  function closeBurgerMenu() {
    mainWrapper.classList.remove("burger-active");
    burgerButton.classList.remove("is-active");
    document.body.style.overflow = "";
  }

  // Забыл пароль
  if (restoreButton) {
    restoreButton.addEventListener("click", (e) => {
      e.preventDefault();

      const containerForm = document.querySelector(".form");
      const phoneValue = containerForm.querySelector(
        ".input--phone-number"
      ).value;
      const prefix = document.querySelector("#prefix"); //позже исправить на инпут вэлью
      const forgotWrapper = document.querySelector("#forgot");

      if (!phoneValue) return alert("Introduceți numărul de telefon");
      forgotWrapper.innerHTML = `<p class="green-strings-nikita">Trimiterea SMS...</p>`;

      fetch("https://infocar.md/site/request-password-reset", {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prefix: prefix.value, phone: phoneValue }),
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            return res.jsaddEventListener();
          }
          throw new Error(res.status);
        })
        .then((msg) => {
          console.log(msg);
          forgotWrapper.innerHTML = `<span style="color:green">Cod nou trimis prin SMS</span>`;
        })
        .catch((error) => console.error(error));
    });
  }

  //alerts modal
  const modal = document.querySelector(".dialog");
  const modalButton = document.querySelector("#modal-button");
  const closeModalButton = document.querySelector("#close-modal");

  if (modal) {
    function openModal() {
      modal.showModal();
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.close();
      document.body.style.overflow = "";
    }

    modalButton.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });

    closeModalButton.addEventListener("click", (e) => {
      closeModal();
    });

    function closeModalOnOverlay({ currentTarget, target }) {
      const modal = currentTarget,
        clickOnOverlay = target === modal;

      if (clickOnOverlay) {
        closeModal();
      }
    }

    modal.addEventListener("click", closeModalOnOverlay);
    modal.addEventListener("cancel", () => closeModal());
  }

  // Код СМС из буфера обмена
  const input = document.querySelector(".input--phone-number");

  document.addEventListener("paste", (e) => {
    if (e.target === input) {
      let pasteData = (e.clipboardData || window.clipboardData).getData("text");
      const regex = /^([0-9]{6})$/;
      if (regex.test(pasteData)) {
        for (let i = 0; i < pasteData.length; i++) {
          let j = i + 1;
          document
            .querySelector('input[name="pincode-' + j + '"]')
            .value(pasteData[i]);
        }
      }
    }
  });

  // Предварительная проверка
  document.querySelector("#check_vin").addEventListener("submit", function (e) {
    e.preventDefault();
    let gn =
      document.querySelector("#gn_letters").value() +
      document.querySelector("#gn_numbers").value();
    let vin = document.querySelector("#vin").value();
    let prefix = document.querySelector("#prefix").value();
    let phone = document.querySelector("#phone").value();
    let sms = "";
    if (
      document.querySelector('input[name="pincode-1"]').value() &&
      document.querySelector('input[name="pincode-2"]').value() &&
      document.querySelector('input[name="pincode-3"]').value() &&
      document.querySelector('input[name="pincode-4"]').value() &&
      document.querySelector('input[name="pincode-5"]').value() &&
      document.querySelector('input[name="pincode-6"]').value()
    ) {
      sms =
        document.querySelector('input[name="pincode-1"]').value() +
        document.querySelector('input[name="pincode-2"]').value() +
        document.querySelector('input[name="pincode-3"]').value() +
        document.querySelector('input[name="pincode-4"]').value() +
        document.querySelector('input[name="pincode-5"]').value() +
        document.querySelector('input[name="pincode-6"]').value();
    }
    let password = document.querySelector("#password").value();
    if (!gn && !vin) {
      // Нет ни госномера, ни винкода
      alert(txt_4);
      return false;
    }
    if (!phone) {
      // Нет телефона
      alert(txt_5);
      return false;
    }
    if (!document.querySelector("#cbx").checked) {
      // Не отмечен крыжик
      alert(txt_9);
      return false;
    }
    if (!sms && !password) {
      // Проверяем наличие аккаунта
      fetch("https://infocar.md/site/check-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prefix: prefix, phone: phone }),
      })
        .then((res) => {
          if (res.ok) {
            return res.jsaddEventListener();
          }
          throw new Error(res.status);
        })
        .then((msg) => {
          if (msg === "Authorized") {
            checkStart(gn, vin);
          } else if (msg === "SMS") {
            document.querySelector("#form_sms").style.display = "block";
          } else if (msg === "SMS Exist") {
            document.querySelector("#form_sms").style.display = "block";
            document.querySelector("#form_sms_limit").style.display = "block";
          } else if (msg === "Found") {
            document.querySelector("#form_password").style.display = "block";
          } else if (msg === "Ban") {
            document.querySelector("#banned").style.display = "block";
          } else if (msg === "Error") {
            alert("Număr de telefon introdus incorect");
          }
        });
    } else if (sms) {
      // Проверяем введенный смс-код

      fetch("https://infocar.md/site/check-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prefix: prefix, phone: phone, sms: sms }),
      })
        .then((res) => {
          if (res.ok) {
            return res.jsaddEventListener();
          }
          throw new Error(res.status);
        })
        .then((msg) => {
          if (msg === "OK") {
            checkStart(gn, vin);
          } else {
            alert(txt_8);
            return false;
          }
        });
    } else if (password) {
      // Проверяем введенный пароль
      fetch("https://infocar.md/site/check-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prefix: prefix,
          phone: phone,
          password: password,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.jsaddEventListener();
          }
          throw new Error(res.status);
        })
        .then((msg) => {
          if (msg === "OK") {
            checkStart(gn, vin);
          } else if (msg === "Wrong password") {
            alert(txt_6);
            return false;
          } else if (msg === "Not found") {
            alert(txt_7);
            return false;
          }
        });
    }
  });
  // vin/get
  document
    .querySelector(".select-report-type")
    .addEventListener("click", function () {
      let tp = document.querySelector(this).dataset.tp;
      let check = document.querySelector(this).dataset.check;
      let variants = document.querySelector("#variants");
      variants.innerinnerHTML(
        '<img src="/img/scndmr.svg?v=' +
          getRandomInt(9999) +
          '" style="display: block; width:220px; margin: 0 auto">'
      );
      fetch("https://infocar.md/vin/prepay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tp: tp,
          check: check,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.jsaddEventListener();
          }
          throw new Error(res.status);
        })
        .then((msg) => {
          if (msg === "OK") {
            variants.onload = () => {
              // "/vin/found?tp=" + tp + "&check=" + check,
              gotopay();
            };
          }
        });
    });

  // load-pdf
  document.querySelector(".load-pdf").addEventListener("click", function (e) {
    e.preventDefault();
    let span = document.querySelector(this).closest("span");
    span.innerinnerHTML('<img src="/img/745.png">');
    let link = document.querySelector(this).getAttribute("href");
    fetch(link, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.jsaddEventListener();
        }
        throw new Error(res.status);
      })
      .then((res) => {
        span.innerinnerHTML("");
        window.location = link;
      });
  });

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function checkStart(gn, vin) {
    document.querySelector("#check_vin").style.display = "none";
    document.querySelector("#wait").style.display = "block";
    document
      .querySelector("#scndmr")
      .getAttribute("src", "/img/scndmr.svg?v=" + getRandomInt(9999));
    fetch("https://infocar.md/vin/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gn: gn,
        vin: vin,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.jsaddEventListener();
        }
        throw new Error(res.status);
      })
      .then((msg) => {
        document.querySelector("#wait").style.display = "none";
        console.log(msg);
        if (msg.includes("/vin/get/")) {
          return location.assign(msg);
        } else {
          if (/^-?\d+$/.test(msg)) {
            document.querySelector("#num_price").innerHTML(msg);
            document.querySelector("#is_free").style.display = "block";
            return false;
          }
          if (msg === "Need IDNV") {
            document.querySelector("#vin_value").value(vin);
            document.querySelector("#gn_value").value(gn);
            document.querySelector("#by_idnv").style.display = "block";
          } else if (msg === "Limit") {
            document.querySelector("#check_limit").style.display = "block";
          } else if (
            msg === "vin error" ||
            msg === "Codul VIN introdus incorect"
          ) {
            document.querySelector("#problem-vin").style.display = "block";
          } else {
            document.querySelector("#not_found_number").innerHTML(gn);
            document.querySelector("#problem").style.display = "block";
          }
        }
      });
  }

  document
    .querySelector("#check_idnv")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      document.querySelector("#wait").style.display = "block";
      let data = new FormData(this);
      fetch("https://infocar.md/vin/check-idnv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((res) => {
          if (res.ok) {
            return res.jsaddEventListener();
          }
          throw new Error(res.status);
        })
        .then((msg) => {
          document.querySelector("#wait").style.display = "none";
          if (msg.includes("/vin/get/")) {
            return location.assign(msg);
          } else {
            document.querySelector("#problem").style.display = "block";
            document.querySelector("#idnvform").style.display = "none";
          }
        });
    });

  // Пополнение кошелька через банк
  document.querySelector("#add_bank").addEventListener("submit", function (e) {
    e.preventDefault();
    document.querySelector(this).querySelector("button").disabled = true;
    let sum = document.querySelector("#sum").value();
    let data = new FormData(this);
    fetch("https://infocar.md/vin/add-bank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sum: sum }),
    })
      .then((res) => {
        if (res.ok) {
          return res.jsaddEventListener();
        }
        throw new Error(res.status);
      })
      .then((data) => {
        if (data === "Error") {
          return alert("Ошибка! Повторите попытку позже...");
        }
        location.assign(data);
      });
  });

  function gotopay() {
    // Заказ отчета
    document.querySelector("#get_vin").addEventListener("submit", function (e) {
      e.preventDefault();
      document.querySelector(this).querySelector("button").disabled = true;
      let check_id = document.querySelector("#check_id").value();
      let tp = document.querySelector("#tp").value();
      fetch("https://infocar.md/vin/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ check_id: check_id, tp: tp }),
      })
        .then((res) => {
          if (res.ok) {
            return res.jsaddEventListener();
          }
          throw new Error(res.status);
        })
        .then((data) => {
          if (data === "Error") {
            return alert("Ошибка! Повторите попытку позже...");
          }
          location.assign(data);
        });
    });

    document
      .querySelector("#get_vin_from_balance")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        document.querySelector(this).querySelector("button").disabled = true;
        let check_id = document.querySelector("#check_id").value();
        let tp = document.querySelector("#tp").value();
        fetch("https://infocar.md/vin/order-from-balance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ check_id: check_id, tp: tp }),
        })
          .then((res) => {
            if (res.ok) {
              return res.jsaddEventListener();
            }
            throw new Error(res.status);
          })
          .then((data) => {
            if (data === "Error") {
              return alert("Ошибка! Повторите попытку позже...");
            }
            location.assign(data);
          });
      });
  }
  gotopay();

  // Таблица генерации отчета

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function delayedTable() {
    let div = document.querySelector(".raport");
    let tp = div.dataset.tp;
    let link = div.dataset.link;
    let msec = 6000;
    if (tp == 3) msec = 12000;
    if (link) {
      await sleep(msec);
      document
        .querySelector("#step_1 > img")
        .getAttribute("src", "/img/gr-icon.svg");
      document.querySelector("#step_2").style.display = "block";
      await sleep(msec);
      document
        .querySelector("#step_2 > img")
        .getAttribute("src", "/img/gr-icon.svg");
      document.querySelector("#step_3").style.display = "block";
      await sleep(msec);
      document
        .querySelector("#step_3 > img")
        .getAttribute("src", "/img/gr-icon.svg");
      document.querySelector("#step_4").style.display = "block";
      await sleep(msec);
      document
        .querySelector("#step_4 > img")
        .getAttribute("src", "/img/gr-icon.svg");
      document.querySelector("#step_5").style.display = "block";
      await sleep(msec);
      document
        .querySelector("#step_5 > img")
        .getAttribute("src", "/img/gr-icon.svg");
      await sleep(1000);
      location.assign("/report/" + link);
    }
  }

  delayedTable();
});
