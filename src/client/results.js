import webService from './request.js';
import { truncate, redirect } from './utils.js';
import { basicQuery, countryQuery, ingredientQuery, addFilter} from './libQuery.js';

let res = 0;
window.addEventListener('load', () => {
  let div = document.querySelector('#global-container');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const search = urlParams.get('search');
  const filter = urlParams.get('filter'); 
  render(div, search, filter);
});

function render(div, search, filter) {

  //div de la recherche par plat
  let divPlats = document.createElement('div');
  divPlats.classList.add('dishes-container');
  //div de la recherche par region
  let divRegions = document.createElement('div');
  divRegions.classList.add("allRegions-container");
  //div de la recherche par ingrédients
  let divIngredients = document.createElement('div');
  divIngredients.classList.add("ingredients-container");


  //div contenant les plats (recherche par plat)
  let container1 = document.createElement('div');
  container1.classList.add('result-container');
  //txt de recherche par plat
  let cont1Title = document.createElement('h1');
  cont1Title.innerText = "Résultats par plat";

  //txt de recherche par region
  let cont2Title = document.createElement('h1');
  cont2Title.innerText = "Résultats par cuisine régionale";
  //obj contenant les div de chaque region et ses plats
  var listContainer = {};
  
  //div contenant les plats (recherche par ingrédient)
  let container3 = document.createElement('div');
  container3.classList.add('result-container');
  //txt de recherche par ingrédient
  let cont3Title = document.createElement('h1');
  cont3Title.innerText = "Résultats par ingrédient";

  //definition du filtre
  let filterText = document.querySelector("#selectText");
  filterText.innerHTML = filter || "Aucun Filtre";

  //Récupération de l'ingrédient à exclure
  if(filter === "Filtrer par ingrédients"){
    var splitRecherche = search.split('-');
    search = splitRecherche[0];
    var ingredientExclu = splitRecherche[1];
    console.log(ingredientExclu);
  }
  
  webService
    .request(addFilter(basicQuery(search), filter, ingredientExclu))
    .then((response) => {
      if (response.results.bindings.length === 0) res++;
      let nbResponses = response.results.bindings.length;
      response.results.bindings.forEach((item) => {
        let result = document.createElement('div');
        let img_container = document.createElement('div');
        let img = document.createElement('img');
        img.src = item.img.value;
        img.onerror = function() { this.error=null;this.src='../rsrc/unknownDish.png'; }
        img.alt = item.name.value;
        img.classList.add('result__img');
        img_container.appendChild(img);
        img_container.classList.add('result__img-container');
        result.appendChild(img_container);
        result.classList.add('result');
        let name = document.createElement('h2');
        name.classList.add('result__name');
        name.innerText = item.name.value;
        result.appendChild(name);
        let desc = document.createElement('p');
        desc.classList.add('result__desc');
        desc.innerText = truncate(item.desc.value, 200);
        result.appendChild(desc);
        result.addEventListener('click', () => {
          redirect(`detail`, `search`, item.name.value);
        });
        container1.appendChild(result);
      });
      if(container1.innerText)
      {
        cont1Title.innerText = cont1Title.innerText + " ("+nbResponses+" résultats)"
        divPlats.appendChild(cont1Title);
        divPlats.appendChild(container1);
        div.appendChild(divPlats);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      if (res === 3) {
        let noResult = document.createElement('h1');
        noResult.innerText = 'Aucun résultat';
        div.appendChild(noResult);
      }
    });
      

    webService
    .request(addFilter(countryQuery(search), filter, ingredientExclu))
    .then((response) => {
      if (response.results.bindings.length === 0) res++;
      let nbResponses = {};
      response.results.bindings.forEach((item) => {
        let result = document.createElement('div');
        let img_container = document.createElement('div');
        let img = document.createElement('img');
        img.src = item.img.value;
        img.onerror = function() { this.error=null;this.src='../rsrc/unknownDish.png'; }
        img.alt = item.name.value;
        img.classList.add('result__img');
        img_container.appendChild(img);
        img_container.classList.add('result__img-container');
        result.appendChild(img_container);
        result.classList.add('result');
        let name = document.createElement('h2');
        name.classList.add('result__name');
        name.innerText = item.name.value;
        result.appendChild(name);
        let desc = document.createElement('p');
        desc.classList.add('result__desc');
        desc.innerText = truncate(item.desc.value, 200);
        result.appendChild(desc);
        result.addEventListener('click', () => {
          redirect(`detail`, `search`, item.name.value);
        });
        //container2.appendChild(result);

        if(!(listContainer[item.countryName.value] !== undefined)){
          //le grand container de la région
          listContainer[item.countryName.value] = document.createElement('div');
          let conName = item.countryName.value;
          listContainer[item.countryName.value].classList.add(conName.replace(/ /g,'_'));
          listContainer[item.countryName.value].classList.add("region-container");
          //description
          let tempElem = document.createElement('h2');
          tempElem.innerText = item.countryName.value;
          tempElem.classList.add("RegionNameText");
          tempElem.addEventListener('click', () => {
            let dishList = tempElem.nextSibling;
            if(dishList.getAttribute("customVis") == (null || "" || "visible"))
            {
              dishList.setAttribute("style", "display:none");
              dishList.setAttribute("customVis", "notVisible");
            }
            else
            {
              dishList.setAttribute("style", "display:grid");
              dishList.setAttribute("customVis", "visible");
            }
          });
          listContainer[item.countryName.value].appendChild(tempElem);
          nbResponses[item.countryName.value] = 0;
          //element
          let newDiv = document.createElement('div');
          newDiv.classList.add('result-container');
          newDiv.setAttribute("customVis", "visible");
          listContainer[item.countryName.value].appendChild(newDiv); 
        }
        listContainer[item.countryName.value].getElementsByClassName("result-container")[0].appendChild(result);
        nbResponses[item.countryName.value] = nbResponses[item.countryName.value] + 1;
      });
      if(Object.keys(listContainer).length!=0)
      {
        divRegions.appendChild(cont2Title);
        for(const con in listContainer){
          listContainer[con].getElementsByClassName("RegionNameText")[0].innerText += " ("+ nbResponses[con]+" résultats)";
          divRegions.appendChild(listContainer[con]);
        }
        div.appendChild(divRegions);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      if (res === 3) {
        let noResult = document.createElement('h1');
        noResult.innerText = 'Aucun résultat';
        div.appendChild(noResult);
      }
    });

    webService
    .request(ingredientQuery(search))
    .then((response) => {
      if (response.results.bindings.length === 0) res++;
      response.results.bindings.forEach((item) => {
        let result = document.createElement('div');
        let img_container = document.createElement('div');
        let img = document.createElement('img');
        img.src = item.img.value;
        img.onerror = function() { this.error=null;this.src='../rsrc/unknownDish.png'; }
        img.alt = item.name.value;
        img.classList.add('result__img');
        img_container.appendChild(img);
        img_container.classList.add('result__img-container');
        result.appendChild(img_container);
        result.classList.add('result');
        let name = document.createElement('h2');
        name.classList.add('result__name');
        name.innerText = item.name.value;
        result.appendChild(name);
        let desc = document.createElement('p');
        desc.classList.add('result__desc');
        desc.innerText = truncate(item.desc.value, 200);
        result.appendChild(desc);
        result.addEventListener('click', () => {
          redirect(`detail`, `search`, item.name.value);
        });
        container3.appendChild(result);
      });
      if(container3.innerText)
      {
        divIngredients.appendChild(cont3Title);
        divIngredients.appendChild(container3);
        div.appendChild(divIngredients);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      if (res === 3) {
        let noResult = document.createElement('h1');
        noResult.innerText = 'Aucun résultat';
        div.appendChild(noResult);
      }
    });
}