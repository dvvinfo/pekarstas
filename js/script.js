const copyBtn = document.querySelector(".copy-btn");
const copyInput = document.querySelector(".copy-input");
const copyText = document.querySelector(".copy-text");
const roomRageRate = document.querySelector("#room-page-rate");
const roomLanding2CoverRating = document.querySelector(
  ".room-landing2-cover-rating"
);
const roomLanding2CoverRatingGrade = document.querySelector(
  ".room-landing2-cover__rating-grade"
);

// всплывашка Рейтинг покер-рума
roomLanding2CoverRatingGrade.addEventListener("click", () => {
  roomLanding2CoverRating.classList.add("active");
  roomLanding2CoverRating.style.height = "480px";
});
roomLanding2CoverRating.addEventListener("click", () => {
  roomLanding2CoverRating.classList.remove("active");
  roomLanding2CoverRating.style.height = "0";
});

// сопирование кода
copyBtn.addEventListener("click", getCopy);

function getCopy() {

  const text = copyInput.value;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      setTimeout(() => {
        copyInput.classList.add("copy-hidden");
        copyText.classList.add("copy-visible");
        copyBtn.classList.add("copy-hidden");
      }, 1000);
    })
    .catch((err) => {
      console.error("Error in copying text: ", err);
    });

  setTimeout(() => {
    copyInput.classList.remove("copy-hidden");
    copyText.classList.remove("copy-visible");
    copyBtn.classList.remove("copy-hidden");
  }, 2000);
}
