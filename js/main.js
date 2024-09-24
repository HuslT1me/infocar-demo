document.addEventListener("DOMContentLoaded", () => {
  // Кнопка скроллинга вверх
  const languageLinks = document.querySelectorAll(".nav-language");
  const passwordEyeButton = document.querySelector(
    ".password__input-pass-control"
  );
  const passwordInput = document.querySelector(".input--password");
  const restoreBlock = document.querySelector("#forgot");
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
  burgerButton.addEventListener("click", toggleBurgerMenu);

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

      fetch("https://infocar.md/login/site/request-password-reset", {
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
            return res.json();
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

  // Alerts (не доделали)
  //   if ($('.overlay-popup').length) {
  //     $('html, body').css('overflow', 'hidden');
  // }
  // $('.popup-close, .overlay').on('click', function(e) {
  //     e.preventDefault();
  //     $('.overlay').hide();
  //     $('.popup').hide();
  //     $('html, body').css('overflow', '');
  // });

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
});

// есть ли функции которые не используются
// найти элементы оставшиейся
// если плагин на jq то нужны ли они
