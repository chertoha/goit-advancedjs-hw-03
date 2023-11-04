import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { createInfoData } from './js/info';

const select = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

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

  fetchCatByBreed(breedId)
    .then(data => {
      populateInfo(data[0]);
    })
    .catch(() => {
      showError(true);
    });
});

// ----------------------- Helpers
function populateSelect(breeds) {
  const disabledOption = `<option value="" selected disabled hidden>-- Choose breed --</option>`;
  const optionsMarkup = breeds
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  select.insertAdjacentHTML('afterbegin', disabledOption + optionsMarkup);
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
  loader.style.display = isLoading ? 'block' : 'none';
}

function showSelect(isVisible) {
  select.style.display = isVisible ? 'block' : 'none';
}

function showError(isError) {
  error.style.display = isError ? 'block' : 'none';
}
