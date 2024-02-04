
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../img/bi_x-octagon.png';
import iconX from '../img/bi_x-lg-1.png';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';




const searchElem = document.querySelector('.search-img');
const btnElem = document.querySelector('.button-search');
const formElem = document.querySelector('.form');
const galleryElem = document.querySelector('.gallery');
const loaderContainer = document.querySelector('.loader');



formElem.addEventListener('submit', onFormSubmit);

function onFormSubmit(e){
    e.preventDefault();
    const userValue = searchElem.value;
    if(userValue === '') return;
    galleryElem.textContent = '';
    loaderContainer.style.display = 'block';
    findImg(userValue).then( function ({hits}) { 
    if( hits.length === 0) {
        iziToast.show({
            message:`"Sorry, there are no images matching your search query. Please try again!"`,
            backgroundColor: '#EF4040',
            messageColor: '#FFF',
            messageSize: '16px',
            position: 'topRight',
            titleLineHeight: '1.5',
            iconUrl: iconError,
            close: false,
            buttons: [
              [
                `<button type="button" style="background-color:#EF4040"><img src=${iconX}></button>`,
                function (instance, toast) {
                  instance.hide({ transitionOut: 'fadeOut' }, toast);
                },
              ],
            ],
        });
    } else {  
        const markup = hits.map(imgTemplate).join('');
        galleryElem.innerHTML = markup;


      const lightBox = new SimpleLightbox('.gallery a');
      lightBox.refresh();
    }

    formElem.reset();
    loaderContainer.style.display = 'none';

    });  
}
 



function imgTemplate({
    webformatURL, 
    largeImageURL, 
    tags, 
    likes, 
    views, 
    comments, 
    downloads}) {
 return `
 <a href="${largeImageURL}" class="gallery">
 <figure> 
  <img src="${webformatURL}" alt="${tags}" class="gallery-img"/>
  <figcaption class="gallery-figcaption">
  <div class="img-item">Likes <span class="img-elem">${likes}</span></div>
  <div class="img-item">View <span class="img-elem">${views}</span></div>
  <div class="img-item">Comments <span class="img-elem">${comments}</span></div>
  <div class="img-item">Downloads <span class="img-elem">${downloads}</span></div>
  </figcaption>
  </figure>
  </a>`
}




function findImg (userValue){
    const BASE_URL = 'https://pixabay.com/api/';
    const PARAMS = new URLSearchParams({
        key : '42200986-2d8f017897691a4245488f945',
        q: userValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safeSearch: true, 
    });
    const url = `${BASE_URL}?${PARAMS}`; 
    return fetch (url).then(res => res.json());
}
