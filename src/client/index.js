import { redirect } from './utils.js';

window.addEventListener('load', () => {

  let select = document.querySelector("#select");
  let list = document.querySelector("#list");
  let selectText = document.querySelector("#selectText");
  let options = document.getElementsByClassName("option");

  select.addEventListener("click", function (event) {
    event.stopPropagation();
    list.classList.toggle("open");
  });
  for(const option of options){
    option.addEventListener("click", function (event) {
      event.stopPropagation();
      selectText.innerHTML = this.innerHTML;
    });
  }

  let searchBtn = document.querySelector('#search-btn');
  let searchInput = document.querySelector('#search-input');

  searchBtn?.addEventListener("click", function(event){ 
    redirect(`results`, `search`, searchInput.value);
  });
  searchInput?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      redirect(`results`, `search`, searchInput.value, `filter`, selectText.innerHTML);
    }
  });

});

