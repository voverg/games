const $modal = document.querySelector('.modal');
const $modalOpen = document.querySelector('.rules');
const $modalClose = document.querySelector('.modal__close');

$modalOpen.addEventListener('click', (event) => {
  $modal.classList.add('modal__show');
});

$modalClose.addEventListener('click', (event) => {
  $modal.classList.remove('modal__show');
});