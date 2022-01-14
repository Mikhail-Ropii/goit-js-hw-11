import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputCountry: document.querySelector('input#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

function countrySearch(evt) {
    const inputValue = evt.target.value.trim();
    fetchCountries(inputValue).then(data => searchRendForm(data));

}
const debounceFetch = debounce(countrySearch, DEBOUNCE_DELAY)
refs.inputCountry.addEventListener('input', debounceFetch);


function searchRendForm(data) {
    if (data.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        clearResult();
        return;
    }
    if (data.length > 1) {
        renderCountryList(data);
    }
   if (data.length === 1) {
        renderCountryInfo(data);
    }
    
}

function clearResult() {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
}

function renderCountryList(data) {
    clearResult();
        const countryListMarkup =
            data.map((country) =>
                `<li style="list-style: none" class="country-item">
        <img src="${country.flags.svg}" width="50">
        <span class=country-name>${country.name.official}</span></li>`
            ).join('')

        refs.countryList.insertAdjacentHTML("beforeend", countryListMarkup);
}

function renderCountryInfo(data) {
    clearResult();
    const [{ name, capital, population, flags, languages }] = data;
    const languagesPars = Object.values(languages).join(', ')
    const countryInfoMarkup = 
    `<p><img src="${flags.svg}" width="50">
    <span class="name-text">${name.official}</span></p>
    <p class="info-text">Capital: <span class="info-value">${capital}</span></p>
    <p class="info-text">Population: <span class="info-value">${population}<span></p>
    <p class="info-text">Languages: <span class="info-value">${languagesPars}</span></p>`

    refs.countryInfo.insertAdjacentHTML("beforeend", countryInfoMarkup);
}

