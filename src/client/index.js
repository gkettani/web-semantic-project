let searchTerm;
let div;

window.addEventListener('load',(event) => {
  searchTerm = document.getElementById('search-input');
  div = document.querySelector('#container');
});

let query = '';
const prefix = `PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX : <http://dbpedia.org/resource/>
PREFIX dbpedia2: <http://dbpedia.org/property/>
PREFIX dbpedia: <http://dbpedia.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
\n`;

const basic_request_head = `SELECT ?name WHERE {
  ?dish a dbo:Food; dbp:name ?name; dbo:thumbnail ?img.
  FILTER(regex(?name, "`;
const basic_request_queue = `"))}`;

function search() {
  query = prefix.concat(basic_request_head, searchTerm.value, basic_request_queue);
  render();
}

function render() {
  request(query)
    .then((response) => {
      response.results.bindings.forEach((item) => {
        console.log(p);
        /*let p = document.createElement('p');
        p.innerHTML = item.label.value;
        div.appendChild(p);*/
      });
    })
    .catch((error) => {
      console.log(error);
    });
}