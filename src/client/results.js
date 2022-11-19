import webService from './request.js';
import { truncate, redirect } from './utils.js';
import { basicQuery, countryQuery, ingredientQuery, addFilter} from './libQuery.js';


window.addEventListener('load', () => {
  let div = document.querySelector('#global-container');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const search = urlParams.get('search');
  const filter = urlParams.get('filter'); 
  render(div, search, filter)
});

function render(div, search, filter) {
  let container1 = document.createElement('div');
  container1.classList.add('result-container');
  let cont1Title = document.createElement('h1');
  cont1Title.innerText = "Résultats par plat";

  let container2 = document.createElement('div');
  container2.classList.add('result-container');
  let cont2Title = document.createElement('h1');
  cont2Title.innerText = "Résultats par cuisine régionale";
  
  let container3 = document.createElement('div');
  container3.classList.add('result-container');
  let cont3Title = document.createElement('h1');
  cont3Title.innerText = "Résultats par ingrédient";

  let filterText = document.querySelector("#selectText");
  filterText.innerHTML = filter;
  
  webService
    .request(addFilter(basicQuery(search), filter))
    .then((response) => {
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
        div.appendChild(cont1Title);
        div.appendChild(container1);
      }
    })
    .catch((error) => {
      console.log(error);
    });

    webService
    .request(addFilter(countryQuery(search), filter))
    .then((response) => {
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
        container2.appendChild(result);
      });
      if(container2.innerText)
      {
        div.appendChild(cont2Title);
        div.appendChild(container2);
      }
    })
    .catch((error) => {
      console.log(error);
    });

    webService
    .request(addFilter(ingredientQuery(search), filter))
    .then((response) => {
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
        div.appendChild(cont3Title);
        div.appendChild(container3);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}