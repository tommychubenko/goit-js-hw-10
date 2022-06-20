import './css/styles.css';
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
console.log(input);
let inputData = '';
let answerList = '';

// function markUp({ capital }) {

//     `<li>${capital}</li>`;

// }

function getCountries() {
  fetch(
    `https://restcountries.com/v2/name/${inputData}?fields=name,capital,currencies`
  )
    .then(responce => {
      return responce.json();
    })
    .then(countries => {
      answerList = '';
      if (countries.length > 10) {
        return console.log('Too many countries');
      } else {
        countries.map(country => {
          answerList += `<li>${country.name}</li>`;
          console.log(answerList);
          return answerList;
        });
      }
    })
    .then(answerList => {
      list.insertAdjacentHTML('afterbegin', answerList);
    });
}

input.addEventListener('input', e => {
  inputData = e.currentTarget.value;
  getCountries();
});
