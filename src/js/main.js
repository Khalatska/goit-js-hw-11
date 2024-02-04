
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../img/bi_x-octagon.png';
import iconX from '../img/bi_x-lg-1.png';



const searchElem = document.querySelector('.search-img');
const btnElem = document.querySelector('.button-search');
const formElem = document.querySelector('.form');



formElem.addEventListener('submit', onFormSubmit);

function onFormSubmit(e){
    e.preventDefault();
    const userValue = searchElem.value;
    if(userValue === '') return;
    findImg(userValue).then(data => { 
    if( Object.entries(data).length === 0) {
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
                `<button type="button" style="background-color:#59A10D"><img src=${iconX}></button>`,
                function (instance, toast) {
                  instance.hide({ transitionOut: 'fadeOut' }, toast);
                },
              ],
            ],
        });
    } else {
        console.log(data);
    }

    formElem.reset();
    });  
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
