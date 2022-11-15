import webService from './request.js';


window.addEventListener('load', () => {
  let div = document.querySelector('#results-container');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const search = urlParams.get('search'); 
  render(div, search)
});
  
// let query = '';
// /* Query example */
// query = `
// SELECT * WHERE {
//   ?country a dbo:Country; dbo:populationTotal ?population; rdfs:label ?label.
//   FILTER(?population > 15000000 && langMatches(lang(?label), "EN"))
// }
// ORDER BY DESC(?population)
// LIMIT 50`;

const query = (search) => `
SELECT ?name, ?img, ?desc, ?country, GROUP_CONCAT(?region;SEPARATOR=", ") AS ?regions WHERE {
  ?dish a dbo:Food; rdfs:label ?name; dbo:thumbnail ?img; rdfs:comment ?desc; dbo:country ?country; dbo:region ?region.
  FILTER(regex(?name, "${search}", "i") && langMatches(lang(?name), "FR") && langMatches(lang(?desc), "FR"))
}`;

function render(div, search) {
  webService
    .request(query(search))
    .then((response) => {
      response.results.bindings.forEach((item) => {
        let result = document.createElement('div');
        let img_container = document.createElement('div');
        let img = document.createElement('img');
        img.src = item.img.value || 'https://via.placeholder.com/150';
        img.alt = item.name.value;
        img.classList.add('result__img');
        img_container.appendChild(img);
        img_container.classList.add('result__img-container');
        result.appendChild(img_container);
        result.classList.add('result');
        result.innerHTML += `
          <div class="result__content">
            <h2 class="result__title">${item.name.value}</h2>
            <p class="result__desc">${item.desc.value}</p>
          </div>
        `;
        div.appendChild(result);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
