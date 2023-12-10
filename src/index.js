import axios from 'axios';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = document.querySelector('.breed-select');
  const catInfoContainer = document.querySelector('.cat-info');

  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });

    breedSelect.addEventListener('change', async event => {
      const selectedBreedId = event.target.value;

      try {
        const catInfo = await fetchCatByBreed(selectedBreedId);

        displayCatInfo(catInfo, catInfoContainer);
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
});

function displayCatInfo(catInfo, container) {
  const { breeds, url } = catInfo;
  const breed = breeds[0];

  container.innerHTML = '';

  const img = document.createElement('img');
  img.src = url;
  img.alt = breed.name;

  const name = document.createElement('h2');
  name.textContent = breed.name;

  const desc = document.createElement('p');
  desc.textContent = breed.description;

  const temper = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = 'Temperament: ';
  temper.appendChild(strong);
  temper.innerHTML += breed.temperament;

  container.appendChild(img);
  container.appendChild(name);
  container.appendChild(desc);
  container.appendChild(temper);
}
