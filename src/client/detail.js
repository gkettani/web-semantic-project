import webService from './request.js';
import { specificQuery, countryQuery } from './libQuery.js';
import { truncate, redirect } from './utils.js';


window.addEventListener('load', () => {
  let div = document.querySelector('#details-container');
  let more = document.querySelector('#see-more');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const search = urlParams.get('search'); 
  render(div, more, search)
});

function render(div, more, search) {
  webService
    .request(specificQuery(search))
    .then((response) => {
      if (response.results.bindings.length === 0) {
        div.innerHTML = `<h1>Auncune information disponible</h1>`;
        return;
      }
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

            var nbCountries = item.countries.value.split(", ").length;
            var country;
            do {
              let index = Math.floor(Math.random() * nbCountries);
              country = item.countries.value.split(", ")[index];
            }
            while(nbCountries != 1 && (country.includes("(") || country.includes(")")));
            console.log(country);

            countries.appendChild(countriesTitle);
            countries.appendChild(countriesNames);
            subCol.appendChild(countries);

            webService
              .request(countryQuery(country))
              .then((response) => {
                if (response.results.bindings.length === 0) {
                  return;
                }
                let nbResponses = response.results.bindings.length;
                const maxMoreResults = 3;
                let dishes = new Array();

                let moreContainer = document.createElement('div');
                moreContainer.classList.add('result-container');
                let moreTitle = document.createElement('h1');
                moreTitle.innerText = "Quelques plats d'une même région culinaire";

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
                  dishes.push(result);
                });
                let indexArray = new Array();
                let i;
                for(i = 0 ; i < maxMoreResults ; ++i) {
                  var index;
                  do {
                    index = Math.floor(Math.random() * nbResponses);
                  }
                  while(indexArray.includes(index));
                  indexArray.push(index);
                  moreContainer.appendChild(dishes[index]);
                }
                more.appendChild(moreTitle);
                more.appendChild(moreContainer);
              })
              .catch((error) => {
                console.log(error);
              });
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
            ingredients.classList.add("ingredientsList");
            let ingredientsTitle = document.createElement('h2');
            let ingredientsList = document.createElement('ul');
            item.ingredients.value.split(", ").forEach((ingredient) => {
              let ingredientName = document.createElement('li');
              ingredientName.innerText = ingredient;
              ingredientName.addEventListener('click', () => {
                redirect(`results`, `search`, ingredient);
              });
              ingredientsList.appendChild(ingredientName);
            });
            ingredientsTitle.innerText = "Ingrédient(s)";
            ingredients.appendChild(ingredientsTitle);
            ingredients.appendChild(ingredientsList);
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
