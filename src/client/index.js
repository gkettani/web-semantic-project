window.addEventListener('load', () => {

  let searchBtn = document.querySelector('#search-btn');
  let searchInput = document.querySelector('#search-input');

  const redirect = () => {
    let searchQuery = searchInput.value;
    if (searchQuery) {
      window.location.href = `results.html?search=${searchQuery}`;
    }
  }

  searchBtn?.addEventListener('click', redirect);
  searchInput?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      redirect();
    }
  });
});