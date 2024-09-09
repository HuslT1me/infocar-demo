document.addEventListener("DOMContentLoaded", () => {
  // Кнопка скроллинга вверх
  const btnScrollUp = document.querySelector(".scroll-up");
  const btnsScrollToElem = document.querySelectorAll(".topLink");
  const languageLinks = document.querySelectorAll(".nav-language");

  //   btnScrollUp.addEventListener("click", () => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   });

  // Плавный скролл к элементу
  //   btnsScrollToElem.forEach((btn) => {
  //     btn.addEventListener("click", (e) => {
  //       e.preventDefault();
  //       const target = e.target;
  //       if (target && target.getAttribute("href")) {
  //         const targetElement = document.querySelector(
  //           target.getAttribute("href")
  //         );
  //         console.log(targetElement);
  //         targetElement.scrollIntoView({ block: "center", behavior: "smooth" });
  //       }
  //     });
  //   });

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
});

// $('.nav-language').click(function (e) {
//     e.preventDefault();
//     let lng = $(this).data('lng');
//     document.cookie = 'language=' + lng + '; Path=/;';
//     location.reload();
// });


// есть ли функции которые не используются
// найти элементы оставшиейся
// если плагин на jq то нужны ли они 
