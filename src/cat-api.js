import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_lEYZY9zF5opwIdZ4qyFEwKgAmOwcybDi0Kpo0KHFZcTcdOHXzTD9xzdg7dmmaygi';

const apiUrl = 'https://api.thecatapi.com/v1/breeds';

export const fetchBreeds = async () => {
  try {
    const response = await axios.get(apiUrl);
    if (response.data.length === 0) throw new Error('No breeds found');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const catApiUrl = 'https://api.thecatapi.com/v1/images/search';

export const fetchCatByBreed = async breedId => {
  try {
    const response = await axios.get(`${catApiUrl}?breed_ids=${breedId}`);
    if (response.data.length === 0)
      throw new Error('No cat images found for the breed');
    return response.data[0];
  } catch (error) {
    return Promise.reject(error);
  }
};
