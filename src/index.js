import SearchPicApi from './fetch-pictures';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import picTpl from './template.hbs'

const refs = {
    searchForm: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    contGallery: document.querySelector('.gallery'),
}

const searchPicApi = new SearchPicApi();

refs.searchForm.addEventListener('submit', searchPictures);
refs.loadMoreBtn.addEventListener('click', loadMore);

function searchPictures(e) {
    e.preventDefault();
    clearResult();
    searchPicApi.inputValue = e.currentTarget.elements.searchQuery.value;
    searchPicApi.resetPage();
    refs.loadMoreBtn.classList.add('is-hidden');
    searchPicApi.fetchPictures().then(rendResults);
   
}

function clearResult() {
    refs.contGallery.innerHTML = '';
    }
    

function loadMore() {
    searchPicApi.fetchPictures().then(loadMoreRend);
}

function scroll() {
const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
}

function lightbox() {
    const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });
}


function loadMoreRend(data) {
    refs.contGallery.insertAdjacentHTML('beforeend', picTpl(data.hits));
    scroll();
    lightbox();
    const maxPage = data.totalHits / 40;
    if (searchPicApi.page > maxPage) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
}

function rendResults(data) {
    if (data.hits.length === 0) {
        Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
        return;
    }
    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`)
    refs.contGallery.insertAdjacentHTML('beforeend', picTpl(data.hits));
    refs.loadMoreBtn.classList.remove('is-hidden');

    lightbox();
}