document.addEventListener("click", ({ target }) => {
  const button = target.closest(".exan-faq__question");
  if (button) {
    button.parentNode
      .querySelector(".exan-faq__answer")
      .classList.toggle("open");
    button.parentNode.querySelector(".exan-faq__add").classList.toggle("close");
    button.parentNode
      .querySelector(".exan-faq__close")
      .classList.toggle("open");
  }
});
