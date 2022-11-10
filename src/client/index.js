import webService from './request.js';

let div = document.querySelector('#container');
let btn = document.querySelector('#btn');
  
let query = '';
/* Query example */
query = `
SELECT * WHERE {
  ?country a dbo:Country; dbo:populationTotal ?population; rdfs:label ?label.
  FILTER(?population > 15000000 && langMatches(lang(?label), "EN"))
}
ORDER BY DESC(?population)
LIMIT 50`;

function render() {
  webService
    .request(query)
    .then((response) => {
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

btn.addEventListener('click', render);