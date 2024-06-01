import { openPopup } from "./modal";

const templateCard = document.querySelector('#card-template').content.querySelector('.card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImageElement = document.querySelector('.popup__image');
const popupCaptionElement = document.querySelector('.popup__caption');

export function createCard(card) {
  const newCard = templateCard.cloneNode(true);
  const deleteButton = newCard.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', function(){
    deleteCard(newCard)
  });

  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  newCard.querySelector('.card__title').textContent = card.name;

  cardImage.addEventListener('click', function(){
    popupImageElement.src = card.link;
    popupImageElement.alt = card.name;
    popupCaptionElement.textContent = card.name;
    openPopup(imagePopup);
  })
  const likeButton = newCard.querySelector('.card__like-button');
  likeButton.addEventListener('click', addLike);
  return newCard;
}

function addLike(event) {
  event.target.classList.toggle('card__like-button_is-active')
}

function deleteCard(card) {
  card.remove();
}
