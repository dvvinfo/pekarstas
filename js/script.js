const copyBtn = document.querySelector(".copy-btn");
const copyInput = document.querySelector(".copy-input");
const copyText = document.querySelector(".copy-text");
const roomRageRate = document.querySelector("#room-page-rate");
const roomContentTabMobile = document.querySelectorAll(".room-content-tab__mobile");
const pageLayoutSliderDots= document.querySelector(".page-layout-slider__dots");
// const btns = pageLayoutSliderDots.querySelectorAll(".room-content-tab__mobile");
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
  }, 2000);
}

// roomContentTabMobile.forEach(element => {
//   element.addEventListener('click', () =>{
//     if (!roomContentTabMobile.className == "active") {
//       roomContentTabMobile.classList.add("active");
//     } 
//   })
// });

// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function () {
//     var current = document.getElementsByClassName("active");

//     // Если нет активного класса
//     if (current.length > 0) {
//       current[0].className = current[0].className.replace(" active", "");
     
//     }

//     // Добавить активный класс для текущей/нажатой кнопки
//     this.className += " active";
//   });
// }
// function myFunction(e) {
//   var elems = document.querySelectorAll(".active-tab");
//   [].forEach.call(elems, function (el) {
//     el.classList.remove("active-tab");
//   });
//   e.target.className = "active-tab";
// }

// myFunction();

// roomContentTabMobile.forEach(button => {
//   button.addEventListener('click', function() {
//     roomContentTabMobile.forEach((btn) => btn.classList.remove("active-tab"));
//     this.classList.add("active-tab");

//   })
// })