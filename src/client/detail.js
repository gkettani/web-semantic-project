import webService from './request.js';
import { specificQuery } from './libQuery.js';


window.addEventListener('load', () => {
  let div = document.querySelector('#details-container');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const search = urlParams.get('search'); 
  render(div, search)
});

function render(div, search) {
  webService
    .request(specificQuery(search))
    .then((response) => {
      response.results.bindings.forEach((item) => {
        //let detail = document.createElement('div');
        let subCol = document.createElement('div');
        let mainCol = document.createElement('div');
        //detail.classList.add('detail');
        subCol.classList.add('detail--sub');
        mainCol.classList.add('detail--main');

        let img_container = document.createElement('div');
        let img = document.createElement('img');

        img.src = item.img.value;
        img.onerror = function() { this.error=null;this.src='../rsrc/unknownDish.png'; }
        img.alt = item.name.value;

        img.classList.add('detail__img');
        img_container.appendChild(img);
        img_container.classList.add('detail__img-container');
        subCol.appendChild(img_container);

        if(item.countries.value) {
            let countries = document.createElement('div');
            let countriesTitle = document.createElement('h2');
            let countriesNames = document.createElement('p');
            countriesTitle.innerText = "Pays lié(s)";
            countriesNames.innerText = item.countries.value;
            countries.appendChild(countriesTitle);
            countries.appendChild(countriesNames);
            subCol.appendChild(countries);
        }

        if(item.regions.value) {
            let regions = document.createElement('div');
            let regionsTitle = document.createElement('h2');
            let regionsNames = document.createElement('p');
            regionsTitle.innerText = "Régions liée(s)";
            regionsNames.innerText = item.regions.value;
            regions.appendChild(regionsTitle);
            regions.appendChild(regionsNames);
            subCol.appendChild(regions);
        }

        if(item.ingredients.value) {
            let ingredients = document.createElement('div');
            let ingredientsTitle = document.createElement('h2');
            let ingredientsNames = document.createElement('p');
            ingredientsTitle.innerText = "Ingrédient(s)";
            ingredientsNames.innerText = item.ingredients.value;
            ingredients.appendChild(ingredientsTitle);
            ingredients.appendChild(ingredientsNames);
            subCol.appendChild(ingredients);
        }
        

        let name = document.createElement('h1');
        name.classList.add('detail__name');
        name.innerText = item.name.value;
        mainCol.appendChild(name);

        let desc = document.createElement('p');
        desc.classList.add('detail__desc');
        desc.innerText = item.desc.value;
        mainCol.appendChild(desc);

        /* detail.append(subCol);
        detail.append(mainCol); */
        div.appendChild(subCol);
        div.appendChild(mainCol);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
