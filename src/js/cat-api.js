import { api, ROUTES } from './config';

export const fetchBreeds = () => {
  return api.get(ROUTES.BREEDS).then(response => {
    return response.data;
  });
};

export const fetchCatByBreed = breedId => {
  return api
    .get(ROUTES.SEARCH, { params: { breed_ids: breedId } })
    .then(response => {
      return response.data;
    });
};
