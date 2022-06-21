export default function getCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,flag,languages,population`
  );
}
