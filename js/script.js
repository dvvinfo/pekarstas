document.addEventListener("DOMContentLoaded", () => {
    const copyBtn = document.querySelector(".copy-btn");
    const copyInput = document.querySelector(".copy-input");
    const copyText = document.querySelector(".copy-text");
    const roomRageRate = document.querySelector("#room-page-rate");
    const roomContentTabMobile = document.querySelectorAll(
      ".room-content-tab__mobile"
    );
    const pageLayoutSliderDots = document.querySelector(
      ".page-layout-slider__dots"
    );
    
    const roomLanding2CoverRating = document.querySelector(
      ".room-landing2-cover-rating"
    );
    const roomLanding2CoverRatingGrade = document.querySelector(
      ".room-landing2-cover__rating-grade"
    );
    const academyTabsLink = document.querySelectorAll(".academy-tabs__link");

    // всплывашка Рейтинг покер-рума
    if (roomLanding2CoverRatingGrade) {
      roomLanding2CoverRatingGrade.addEventListener("click", () => {
        roomLanding2CoverRating.classList.add("active");
        roomLanding2CoverRating.style.height = "480px";
      });
    }
    
    if (roomLanding2CoverRating) {
      roomLanding2CoverRating.addEventListener("click", () => {
        roomLanding2CoverRating.classList.remove("active");
        roomLanding2CoverRating.style.height = "0";
      });
    }
    

    // сопирование кода
    if (copyBtn) {
      copyBtn.addEventListener("click", getCopy);

      function getCopy() {
        const text = copyInput.textContent;
        navigator.clipboard
          .writeText(text)
          .then(() => {
            copyInput.classList.add("copy-hidden");
            copyText.classList.add("copy-visible");
            copyBtn.classList.add("copy-hidden");
          })
          .catch((err) => {
            console.error("Error in copying text: ", err);
          });

        setTimeout(() => {
          copyInput.classList.remove("copy-hidden");
          copyText.classList.remove("copy-visible");
          copyBtn.classList.remove("copy-hidden");
        }, 1000);
      }
    }
    

    roomContentTabMobile.forEach((button) => {
      button.addEventListener("click", function () {
        roomContentTabMobile.forEach((btn) =>
          btn.classList.remove("active-tab")
        );
        this.classList.add("active-tab");
      });
    });

    // добавление активного класса табам академии
    
    academyTabsLink.forEach((button) => {
      button.addEventListener("click", function () {
        academyTabsLink.forEach((btn) => btn.classList.remove("active-btn"));
        this.classList.add("active-btn");
      });
    });
  });
