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
    console.log("click");
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

  restoreButton.addEventListener("click", (e) => {
    e.preventDefault();

    const containerForm = document.querySelector('.form');
    const phoneValue = containerForm.querySelector('.input--phone-number').value;

  });
  

  // Забыл пароль
  //   $('#reset_link').on('click', function (e) {
  //     e.preventDefault();

  //     let phone = $('#phone').val();
  //     let prefix = $('#prefix').val();
  //     let div = $('#forgot');
  //     if(!phone) return alert('Introduceți numărul de telefon');
  //     div.html('Trimiterea SMS...');
  //     jQuery.ajax({
  //         type: 'POST',
  //         url: '/site/request-password-reset',
  //         data: {prefix: prefix, phone: phone},
  //         success: function (msg) {
  //             div.html('<span style="color:green">Cod nou trimis prin SMS</span>');
  //             }
  //     });
  // });

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
});

// есть ли функции которые не используются
// найти элементы оставшиейся
// если плагин на jq то нужны ли они
