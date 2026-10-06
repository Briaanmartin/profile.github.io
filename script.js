document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');
menuButton.hidden = false;
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Tutup menu' : 'Menu';
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
    menuButton.focus();
  }
});

const photos = [...document.querySelectorAll('.photo-button')];
const photoDialog = document.querySelector('#photo-dialog');
let photoGroup = photos;
let currentPhoto = 0;
let photoOpener;
function renderPhoto(index) {
  currentPhoto = (index + photoGroup.length) % photoGroup.length;
  const selected = photoGroup[currentPhoto];
  const source = selected.querySelector('img');
  const image = document.querySelector('#large-photo');
  image.src = source.getAttribute('src');
  image.alt = source.alt;
  document.querySelector('#photo-caption').textContent = selected.dataset.caption;
  document.querySelector('#photo-counter').textContent = `${currentPhoto + 1} / ${photoGroup.length}`;
  document.querySelector('#full-photo').href = source.getAttribute('src');
  document.querySelector('#dialog-category').textContent = selected.dataset.gallery === 'art' ? 'ILUSTRASI & POSTER' : 'PORTOFOLIO LAPANGAN';
}
photos.forEach(button => button.addEventListener('click', () => {
  photoGroup = photos.filter(photo => photo.dataset.gallery === button.dataset.gallery);
  renderPhoto(photoGroup.indexOf(button));
  photoOpener = button;
  photoDialog.showModal();
  document.body.classList.add('modal-open');
}));
document.querySelector('#close-photo').addEventListener('click', () => photoDialog.close());
document.querySelector('#previous-photo').addEventListener('click', () => renderPhoto(currentPhoto - 1));
document.querySelector('#next-photo').addEventListener('click', () => renderPhoto(currentPhoto + 1));
photoDialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  photoOpener?.focus({preventScroll:true});
});
photoDialog.addEventListener('click', event => {
  if (event.target !== photoDialog) return;
  const bounds = photoDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) photoDialog.close();
});
photoDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') {event.preventDefault(); renderPhoto(currentPhoto + 1);}
  if (event.key === 'ArrowLeft') {event.preventDefault(); renderPhoto(currentPhoto - 1);}
});
