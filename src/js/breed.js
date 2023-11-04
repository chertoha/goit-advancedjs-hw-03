import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { createInfoData } from './info';
import { toastError } from './toast';

const PLACEHOLDER_VALUE = 'Choose breed';

const select = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

const slimSelect = new SlimSelect({
  select: select,
});

loading(true);
showSelect(false);

fetchBreeds()
  .then(breeds => {
    populateSelect(breeds);
    showSelect(true);
  })
  .catch(() => {
    toastError();
  })
  .finally(() => {
    loading(false);
  });

select.addEventListener('change', e => {
  const breedId = e.target.value;

  if (breedId === PLACEHOLDER_VALUE) return;

  loading(true);
  showInfo(false);

  fetchCatByBreed(breedId)
    .then(data => {
      populateInfo(data[0]);
      showInfo(true);
    })
    .catch(() => {
      toastError();
    })
    .finally(() => {
      loading(false);
    });
});

// ----------------------- Helpers
function populateSelect(breeds) {
  const data = breeds.map(({ id, name }) => ({ text: name, value: id }));
  slimSelect.setData([{ placeholder: true, text: PLACEHOLDER_VALUE }, ...data]);
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

function showInfo(isVisible) {
  info.classList.toggle('hidden', !isVisible);
}
