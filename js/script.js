const copyBtn = document.querySelector('.copy-btn');
const copyInput = document.querySelector(".copy-input");
const copyText = document.querySelector(".copy-text");
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
