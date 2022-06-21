import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const oneCountry = document.querySelector('.country-info');
let answerList = '';

function getCountries({ target }) {
  fetchCountries(target.value)
    .then(responce => responce.json())
    .then(countries => {
      answerList = '';
      if (countries.length > 10) {
        list.innerHTML = '';
        oneCountry.innerHTML = '';
        Notify.success(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length > 1) {
        manyCountries(countries);
      } else if (countries.length === 1) {
        oneCountryfnx(countries[0]);
      } else {
        (list.innerHTML = ''),
          (oneCountry.innerHTML = ''),
          Notify.failure('Oops, there is no country with that name');
      }
    })
    .catch(() =>
      Notify.failure(`Ooops... Something wrong... Maybe it is a problem `)
    );
}

function manyCountries(countries) {
  list.innerHTML = '';
  oneCountry.innerHTML = '';
  countries.map(country => {
    answerList += `<li class="item"><img src="${country.flag}" alt="Flag of ${country.name}" class="flag"><p class="country_name">${country.name}</p></li>`;
    list.innerHTML = answerList;
  });
}

function oneCountryfnx(country) {
  const { name, flag, capital, population } = country;
  list.innerHTML = '';
  oneCountry.innerHTML = `<ul><li><img src="${flag}" alt="Flag of ${name}" class="one-flag"><span class="one-name"> ${name}</span></li><li><p class="one-info"><b>Capital: </b>${capital}</p></li><li><p class="one-info"><b>Population: </b>${population}</p></li><li><p class="one-info"><b>Languages:</b> ${country.languages[0].name}</p></li></ul>`;
}

input.addEventListener(
  'input',
  debounce(e => {
    getCountries(e);
  }, DEBOUNCE_DELAY)
);
