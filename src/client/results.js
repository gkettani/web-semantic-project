import webService from './request.js';
import { truncate, redirect } from './utils.js';
import { basicQuery, countryQuery } from './libQuery.js';


window.addEventListener('load', () => {
  let div = document.querySelector('#global-container');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const search = urlParams.get('search'); 
  render(div, search)
});

function render(div, search) {
  let container1 = document.createElement('div');
  container1.classList.add('result-container');
  let cont1Title = document.createElement('h1');
  cont1Title.innerText = "Résultats par plat";

  let container2 = document.createElement('div');
  container2.classList.add('result-container');
  let cont2Title = document.createElement('h1');
  cont2Title.innerText = "Résultats par cuisine régionale";
  
  var listContainer = {};

  webService
    .request(basicQuery(search))
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
        let name = document.createElement('h2');
        name.classList.add('result__name');
        name.innerText = item.name.value;
        result.appendChild(name);
        let desc = document.createElement('p');
        desc.classList.add('result__desc');
        desc.innerText = truncate(item.desc.value, 100);
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
    .request(countryQuery(search))
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
        let name = document.createElement('h2');
        name.classList.add('result__name');
        name.innerText = item.name.value;
        result.appendChild(name);
        let desc = document.createElement('p');
        desc.classList.add('result__desc');
        desc.innerText = truncate(item.desc.value, 100);
        result.appendChild(desc);
        result.addEventListener('click', () => {
          redirect(`detail`, `search`, item.name.value);
        });
        container2.appendChild(result);
        if(!(listContainer[item.countryName.value] !== undefined)){
          listContainer[item.countryName.value] = document.createElement('div');
          let conName = item.countryName.value;
          conName = conName.replace(/ /g,'_');
          listContainer[item.countryName.value].classList.add(conName);
          let tempElem = document.createElement('h3');
          tempElem.innerText = item.countryName.value;
          listContainer[item.countryName.value].appendChild(tempElem);
          listContainer[item.countryName.value].appendChild(result);
          console.log(listContainer[item.countryName.value]);
        }
        else{
          listContainer[item.countryName.value].appendChild(result);
        }
      });
      if(container2.innerText)
      {
        // console.log(listContainer[item.countryName.value]);
        div.appendChild(cont2Title);
       //div.appendChild(container2);
        for(const con in listContainer){
          div.appendChild(listContainer[con]);
        }
        //listContainer.forEach((divContainer) => {div.appendChild(divContainer)});
      }
    })
    .catch((error) => {
      console.log(error);
    });
}