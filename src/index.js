import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const oneCountry = document.querySelector('.country-info');

let answerList = '';

function getCountries(e) {
  fetch(
    `https://restcountries.com/v2/name/${e.currentTarget.value}?fields=name,capital,flag,languages,population`
  )
    .then(responce => {
      return responce.json();
    })
    .then(countries => {
      answerList = '';

      if (countries.length > 10) {
        list.innerHTML = '';
        oneCountry.innerHTML = '';
        Notify.success(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length > 1) {
        list.innerHTML = '';
        oneCountry.innerHTML = '';
        countries.map(country => {
          answerList += `<li class="item"><img src="${country.flag}" alt="Flag of ${country.name}" class="flag"><p class="country_name">${country.name}</p></li>`;
          list.innerHTML = answerList;
        });
      } else if (countries.length === 1) {
        const { name, flag, capital, population } = countries[0];
        list.innerHTML = '';
        oneCountry.innerHTML = `<ul><li><img src="${flag}" alt="Flag of ${name}" class="one-flag"><span class="one-name"> ${name}</span></li><li><p class="one-info"><b>Capital: </b>${capital}</p></li><li><p class="one-info"><b>Population: </b>${population}</p></li><li><p class="one-info"><b>Languages:</b> ${countries[0].languages[0].name}</p></li></ul>`;
      } else {
        (list.innerHTML = ''),
          (oneCountry.innerHTML = ''),
          Notify.failure('Oops, there is no country with that name');
      }
    });
}

input.addEventListener('input', e => {
  getCountries(e);
});

// document.addEventListener('click', debounce(console.log(e.currentTarget), 300));
