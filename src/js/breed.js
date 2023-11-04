// import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { createInfoData } from './info';
// import { TomSelect } from 'tom-select';

const select = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

const slimSelect = new SlimSelect({
  select: select,
});

loading(true);
showSelect(false);
showError(false);

fetchBreeds()
  .then(breeds => {
    populateSelect(breeds);
    showSelect(true);
  })
  .catch(() => {
    showError(true);
  })
  .finally(() => {
    loading(false);
  });

select.addEventListener('change', e => {
  const breedId = e.target.value;

  loading(true);
  showInfo(false);
  showError(false);

  fetchCatByBreed(breedId)
    .then(data => {
      populateInfo(data[0]);
      showInfo(true);
    })
    .catch(() => {
      showError(true);
    })
    .finally(() => {
      loading(false);
    });
});

// ----------------------- Helpers
function populateSelect(breeds) {
  // const disabledOption = `<option value="" selected disabled hidden>-- Choose breed --</option>`;
  // const optionsMarkup = breeds
  //   .map(({ id, name }) => `<option value="${id}">${name}</option>`)
  //   .join('');
  // select.insertAdjacentHTML('afterbegin', disabledOption + optionsMarkup);
}

function populateInfo(data) {
  if (!data) {
    throw new Error();
  }
  const breedUrl = data.url;
  const { name, description, temperament } = data.breeds[0];

  const fragment = createInfoData(breedUrl, name, description, temperament);
  info.innerHTML = '';
  info.appendChild(fragment);
}

function loading(isLoading) {
  loader.classList.toggle('hidden', !isLoading);
}

function showSelect(isVisible) {
  select.classList.toggle('hidden', !isVisible);
}

function showError(isError) {
  error.classList.toggle('hidden', !isError);
}

function showInfo(isVisible) {
  info.classList.toggle('hidden', !isVisible);
}
