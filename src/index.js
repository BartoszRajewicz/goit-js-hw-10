import axios from 'axios';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = document.querySelector('.breed-select');
  const catInfoContainer = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');
  const errorContainer = document.querySelector('.error');

  loader.classList.add('visible');

  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });

    breedSelect.addEventListener('change', async event => {
      loader.classList.add('visible');
      errorContainer.classList.remove('visible');

      const selectedBreedId = event.target.value;

      try {
        const catInfo = await fetchCatByBreed(selectedBreedId);
        displayCatInfo(catInfo, catInfoContainer);
      } catch (error) {
        console.error(error);
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
        errorContainer.classList.add('visible');
      } finally {
        loader.classList.remove('visible');
      }
    });

    loader.classList.remove('visible');
  } catch (error) {
    console.error(error);
    errorContainer.classList.add('visible');
    loader.classList.remove('visible');
  }
});

function displayCatInfo(catInfo, container) {
  const { breeds, url } = catInfo;
  const breed = breeds[0];

  container.innerHTML = '';

  const img = document.createElement('img');
  img.src = url;
  img.alt = breed.name;

  const textContainer = document.createElement('div');
  textContainer.classList.add('text-container');

  const name = document.createElement('h2');
  name.textContent = breed.name;

  const desc = document.createElement('p');
  desc.classList.add('description');
  desc.textContent = breed.description;

  const temper = document.createElement('p');
  temper.textContent = `Temperament: ${breed.temperament}`;

  container.appendChild(img);
  container.appendChild(name);
  container.appendChild(desc);
  container.appendChild(temper);
}
