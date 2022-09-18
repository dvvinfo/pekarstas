const copyBtn = document.querySelector('.copy-btn');
const copyInput = document.querySelector(".copy-input");
const copyText = document.querySelector(".copy-text");
const roomRageRate = document.querySelector("#room-page-rate");
const roomLanding2CoverRating = document.querySelector(
  ".room-landing2-cover-rating"
);
const roomLanding2CoverRatingGrade = document.querySelector(
  ".room-landing2-cover__rating-grade"
);
roomLanding2CoverRatingGrade.addEventListener('click', () => {
  roomLanding2CoverRating.classList.add("active");
  roomLanding2CoverRating.style.height='480px'
});
roomLanding2CoverRating.addEventListener("click", () => {
  roomLanding2CoverRating.classList.remove("active");
  roomLanding2CoverRating.style.height = "0";
});



copyBtn.addEventListener("click", getCopy);
copyBtn.addEventListener("mouseout", getClass);

  function getCopy() {
    copyInput.select();
    document.execCommand("copy");
    copyInput.classList.add("copy-hidden");
    copyText.classList.add("copy-visible");
    
  }
 function getClass() {
   copyInput.classList.remove("copy-hidden");
   copyText.classList.remove("copy-visible");
   console.log('ghbdtn')
 
 }