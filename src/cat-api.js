import Notiflix from 'notiflix';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_lEYZY9zF5opwIdZ4qyFEwKgAmOwcybDi0Kpo0KHFZcTcdOHXzTD9xzdg7dmmaygi';

const apiUrl = 'https://api.thecatapi.com/v1/breeds';

export const fetchBreeds = async () => {
  try {
    const response = await axios.get(apiUrl);
    if (response.data.length === 0) throw new Error();
    return response.data;
  } catch (error) {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  }
};

const catApiUrl = 'https://api.thecatapi.com/v1/images/search';

export const fetchCatByBreed = async breedId => {
  try {
    const response = await axios.get(`${catApiUrl}?breed_ids=${breedId}`);
    if (response.data.length === 0) throw new Error();
    return response.data[0];
  } catch (error) {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    return Promise.reject(error);
  }
};
