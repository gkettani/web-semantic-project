import webService from './request.js';


window.addEventListener('load', () => {
  let div = document.querySelector('#results-container');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const search = urlParams.get('search'); 
  render(div, search)
});
  
let query = '';
/* Query example */
query = `
SELECT * WHERE {
  ?country a dbo:Country; dbo:populationTotal ?population; rdfs:label ?label.
  FILTER(?population > 15000000 && langMatches(lang(?label), "EN"))
}
ORDER BY DESC(?population)
LIMIT 50`;

function render(div, search) {
  webService
    .request(query)
    .then((response) => {
      let h1 = document.createElement('h1');
      h1.innerHTML = `Results for: ${search}`;
      div.appendChild(h1);
      response.results.bindings.forEach((item) => {
        let p = document.createElement('p');
        p.innerHTML = item.label.value;
        div.appendChild(p);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
