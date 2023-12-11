import axios from 'axios';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = document.querySelector('.breed-select');
  const catInfoContainer = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');
  const errorContainer = document.querySelector('.error');

  try {
    loader.classList.add('visible'); 
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
  } catch (error) {
    console.error(error);
    errorContainer.classList.add('visible'); // Wyświetl komunikat o błędzie
  } finally {
    loader.classList.remove('visible'); // Ukryj loader po zakończeniu żądania
  }
});
