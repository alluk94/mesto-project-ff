import { initialCards } from './scripts/cards';
import { closePopup, openPopup } from './components/modal';
import './styles/index.css';
import { createCard } from './components/card';

const listContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const newPopup = document.querySelector('.popup_type_new-card');
const editPopup = document.querySelector('.popup_type_edit');
const closeButtons = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const popups = document.querySelectorAll('.popup');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputTypeUrl = document.querySelector('.popup__input_type_url');
const editProfile = document.forms["edit-profile"];
const nameInput = document.querySelector('.popup__input_type_name');
const employInput = document.querySelector('.popup__input_type_description');
const newFormCard = document.forms["new-place"];
const name = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');
const imagePopup = document.querySelector('.popup_type_image');
const popupImageElement = document.querySelector('.popup__image');
const popupCaptionElement = document.querySelector('.popup__caption');
const templateCard = document.querySelector('#card-template').content.querySelector('.card');

addButton.addEventListener('click', function() {
  openPopup(newPopup)
});

editButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  employInput.value = profileDescr.textContent;
  openPopup(editPopup);
});

function editFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const employValue = employInput.value;
  name.textContent = nameValue;
  description.textContent = employValue;
  closePopup(editPopup);
};

editProfile.addEventListener('submit', editFormSubmit);

for(let i = 0; i < closeButtons.length; i++) {
  const button = closeButtons[i];
  button.addEventListener('click', function(){
    const modal = button.closest('.popup');
    closePopup(modal)
  }
)};

document.addEventListener('mousedown', function(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    for (var i= 0; i < popups.length; i++) {
      popups[i].classList.remove('popup_is-opened');
    }
  }
})

for(let i = 0; i < initialCards.length; i++) {
  const newCard = createCard(initialCards[i], handleImageClick, templateCard)
  listContainer.prepend(newCard)
}

newFormCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const name = inputCardName.value;
  const link = inputTypeUrl.value;
  const newCard = createCard({name, link}, handleImageClick, templateCard);
  listContainer.prepend(newCard);
  closePopup(newPopup);
  newFormCard.reset(); // clean form
})

popups.forEach(function(item) {
    item.classList.add('popup_is-animated')
})

function handleImageClick(card) {
  popupImageElement.src = card.link;
  popupImageElement.alt = card.name;
  popupCaptionElement.textContent = card.name;
  openPopup(imagePopup);
}
