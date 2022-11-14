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


function rechercher() {
    query = prefix.concat(basic_request_head, searchTerm.value, basic_request_queue);

// Encodage de l'URL à transmettre à DBPedia
var url_base = "http://dbpedia.org/sparql";
var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";

// Requête HTTP et affichage des résultats
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var results = JSON.parse(this.responseText);
        afficherResultats(results);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
}

// Affichage des résultats dans un tableau
function afficherResultats(data)
{
// Tableau pour mémoriser l'ordre des variables ; sans doute pas nécessaire
// pour vos applications, c'est juste pour la démo sous forme de tableau
var index = [];

var contenuTableau = "<tr>";

data.head.vars.forEach((v, i) => {
    contenuTableau += "<th>" + v + "</th>";
    index.push(v);
});

data.results.bindings.forEach(r => {
    contenuTableau += "<tr>";

    index.forEach(v => {

    if (r[v].type === "uri")
    {
        contenuTableau += "<td><a href='" + r[v].value + "' target='_blank'>" + r[v].value + "</a></td>";
    }
    else {
        contenuTableau += "<td>" + r[v].value + "</td>";
    }
    });


    contenuTableau += "</tr>";
});


contenuTableau += "</tr>";

document.getElementById("resultats").innerHTML = contenuTableau;

}