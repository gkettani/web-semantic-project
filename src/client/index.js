import { redirect } from './utils.js';

window.addEventListener('load', () => {

  let searchBtn = document.querySelector('#search-btn');
  let searchInput = document.querySelector('#search-input');
  let filterInput = document.querySelector('#filter-choice');

  searchBtn?.addEventListener('click', redirect(`results`, `search`, searchInput.value));
  searchInput?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      redirect(`results`, `search`, searchInput.value, `filter`, filterInput.value);
    }
  });
});