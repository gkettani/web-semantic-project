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
  //div de la recherche par plat
  let divPlats = document.createElement('div');
  divPlats.classList.add('dishes-container');

  //div de la recherche par region
  let divRegions = document.createElement('div');
  divRegions.classList.add("allRegions-container");

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
        divPlats.appendChild(cont1Title);
        divPlats.appendChild(container1);
        div.appendChild(divPlats);
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
          listContainer[item.countryName.value].appendChild(tempElem);
          //element
          let newDiv = document.createElement('div');
          newDiv.classList.add('result-container');
          listContainer[item.countryName.value].appendChild(newDiv); 
        }
        listContainer[item.countryName.value].getElementsByClassName("result-container")[0].appendChild(result);

      });
      if(Object.keys(listContainer).length!=0)
      {
        divRegions.appendChild(cont2Title);
        for(const con in listContainer){
          divRegions.appendChild(listContainer[con]);
        }
        div.appendChild(divRegions);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}