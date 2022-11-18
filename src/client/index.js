import { redirect } from './utils.js';

window.addEventListener('load', () => {

  let searchBtn = document.querySelector('#search-btn');
  let searchInput = document.querySelector('#search-input');

  searchBtn?.addEventListener('click', redirect(`results`, `search`, searchInput.value));
  searchInput?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      redirect(`results`, `search`, searchInput.value);
    }
  });

  let select = document.querySelector("#select");
  let list = document.querySelector("#list");
  let selectText = document.querySelector("#selectText");
  let options = document.getElementsByClassName("option");

  select.addEventListener("click", function (event) {
    list.classList.toggle("open");
  });
  for(const option of options){
    option.addEventListener("click", function (event) {
      selectText.innerHTML = this.innerHTML;
      searchInput.placeholder = `Rechercher par ${this.innerHTML}...`;
      if(this.innerHTML=="Tous les critères"){
        searchInput.placeholder = `Rechercher...`;
      }
    });
  }

});

