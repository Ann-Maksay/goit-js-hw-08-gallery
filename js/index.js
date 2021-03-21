'use strict'

import galleryInfo from './gallery-items.js';

const ulRef = document.querySelector('.js-gallery');

//Создание и рендер разметки

function createElement(obj, index) {
    const listItem = document.createElement('li');
    listItem.classList.add('gallery__item');

    const linkRef = document.createElement('a');
    linkRef.classList.add('gallery__link');
    linkRef.setAttribute('href', obj.original);

    const imgRef = document.createElement('img');
    imgRef.classList.add('gallery__image');
    imgRef.setAttribute('src', obj.preview);
    imgRef.setAttribute('data-source', obj.original);
    imgRef.setAttribute('data-count', index);
    imgRef.setAttribute('alt', obj.description);
    


    listItem.append(linkRef, imgRef);

    return listItem;
}

const galleryList = galleryInfo.map((elem, index) => createElement(elem, index));

ulRef.append(...galleryList);


//Модальное окно

const modalRef = document.querySelector('.js-lightbox');
const modalBtnRef = document.querySelector('button[data-action="close-lightbox"]');
const modalImgRef = document.querySelector('.lightbox__image');
const modalOverlayRef = document.querySelector('.lightbox__overlay');
let countForEventTarget;

ulRef.addEventListener('click', openModal);
modalBtnRef.addEventListener('click', closeModal);
modalOverlayRef.addEventListener('click', closeModal);

function openModal(event) {
    event.preventDefault();

    if (event.target.nodeName !== 'IMG') {
        return;
    }
    
    const imgRef = event.target;
    countForEventTarget = imgRef.dataset.count;

    modalImgRef.setAttribute('src', imgRef.dataset.source);
    modalImgRef.setAttribute('alt', imgRef.getAttribute('alt'));
    modalRef.classList.add('is-open');

    window.addEventListener('keydown', onPressKey);
}

function closeModal(event) {
    modalRef.classList.remove('is-open');
    modalImgRef.removeAttribute('src');
    modalImgRef.removeAttribute('alt');

    window.removeEventListener('keydown', onPressKey);
}

function onPressKey(event) {
    if (event.code === 'Escape') {
            closeModal();
    }
    if (event.code === 'ArrowRight') {
            onPressArrowRight();
    }
    if (event.code === 'ArrowLeft') {
            onPressArrowLeft();
    }
}

//Пролистывание изображений галереи

function onPressArrowRight(event) {
    if (countForEventTarget !== galleryList.length - 1) {
        countForEventTarget++;
    }
    else {
        countForEventTarget = 0;
    }
    changeImg();
}

function onPressArrowLeft(event) {
    if (countForEventTarget !== 0) {
        countForEventTarget--;
    }
    else {
        countForEventTarget = galleryList.length - 1;
    }
    changeImg();
}

function changeImg(){
    const newImgRef = document.querySelector(`img[data-count="${countForEventTarget}"]`);
    modalImgRef.setAttribute('src', newImgRef.dataset.source);
    modalImgRef.setAttribute('alt', newImgRef.getAttribute('alt'));
}

