import { closePopup, openPopup } from './components/modal';
import './styles/index.css';
import { createCard, isLiked, updateLike } from './components/card';
import { clearValidation, enableValidation, toggleButton, } from './components/validation';
import { addNewCard, editProfileAvatar, editProfileInfo, getAllCards, getUserInfo, handleDeleteCard, handleDislikeCard, handleLikeCard, userData } from './components/api';

const listContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const newPopup = document.querySelector('.popup_type_new-card');
const editPopup = document.querySelector('.popup_type_edit');
const deletePopup = document.querySelector('.popup_type_delete');
const closeButtons = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileImageContainer = document.querySelector('.profile__image-container');
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const editAvatarForm = document.forms["edit-avatar"];
const popups = document.querySelectorAll('.popup');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputTypeUrl = document.querySelector('.popup__input_type_url');
const editProfile = document.forms["edit-profile"];
const deleteForm = document.forms["card-delete"];
const nameInput = document.querySelector('.popup__input_type_name');
const linkInput = document.querySelector('.popup__input_type_link');
const employInput = document.querySelector('.popup__input_type_description');
const newFormCard = document.forms["new-place"];
const name = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');
const imagePopup = document.querySelector('.popup_type_image');
const popupImageElement = document.querySelector('.popup__image');
const popupCaptionElement = document.querySelector('.popup__caption');
const templateCard = document.querySelector('#card-template').content.querySelector('.card');
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Получаем информацию о пользователе и все карточки из сервера
// после того как придет ответ, отображаем данные с помощью функции (then)
Promise.all([getUserInfo(), getAllCards()]).then(([userInfo, cards]) => {
  userData._id = userInfo._id
  createProfile(userInfo);
  renderCards(cards);
})
  .catch((error) => {
    console.log(error);
  })

addButton.addEventListener('click', function() {
  openPopup(newPopup)
  toggleButton(newFormCard, config);
});

editButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  employInput.value = profileDescr.textContent;
  openPopup(editPopup);
  clearValidation(editProfile, config);
});

profileImageContainer.addEventListener('click', function() {
  openPopup(editAvatarPopup);
} )

function editFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = employInput.value;
  // отправляем запрос на редактирование профиля
  // после получения ответа, обновляем профиль
  savingButton(editProfile, true)
  editProfileInfo({name, about})
  .then((data) => {
    createProfile(data);
    closePopup(editPopup);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    savingButton(editProfile, false)
  })
};

function editAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatar = linkInput.value;
  console.log(avatar)
  // отправляем запрос на редактирование профиля
  // после получения ответа, обновляем профиль
  savingButton(editAvatarForm, true)
  editProfileAvatar({avatar})
  .then((data) => {
    createProfile(data);
    closePopup(editAvatarPopup);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    savingButton(editAvatarForm, false)
  })
};

editProfile.addEventListener('submit', editFormSubmit);
editAvatarForm.addEventListener('submit', editAvatarFormSubmit);


popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  })
})

function renderCards(cards) {
  for(let i = 0; i < cards.length; i++) {
    const newCard = createCard(cards[i], handleImageClick, templateCard, deleteCard, handleLikeClick)
    listContainer.append(newCard)

  }
}

function handleLikeClick(card) {
  if(isLiked(card)) {
    removeLike(card)
  }
  else {
    putLike(card)
  }
}

function removeLike(card) {
  handleDislikeCard(card.id)
  .then((data) => {
    updateLike(card, data)
  })
  .catch((error) => {
    console.log(error);
  })
}


function putLike(card) {
  handleLikeCard(card.id)
  .then((data) => {
    console.log(data)
    updateLike(card, data)
  })
  .catch((error) => {
    console.log(error);
  })
}

newFormCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const name = inputCardName.value;
  const link = inputTypeUrl.value;
  // Отправляем запрос на создание карточки
  // после получения ответа, отображаем ее на странице
  savingButton(newFormCard, true)
  addNewCard({name, link})
  .then((data) => {
    const newCard = createCard(data, handleImageClick, templateCard, deleteCard, handleLikeClick);
    listContainer.prepend(newCard);
    newFormCard.reset(); // clean form
    closePopup(newPopup);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    savingButton(newFormCard, false)
  })
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

function createProfile(data) {
  name.textContent = data.name;
  description.textContent = data.about;
  profileImage.src = data.avatar;
}

// функция удаления карточки с сервера
// 1. открывает попап
// 2. слушает отправку формы (кнопка Да)
// 3. отправляет запрос на сервер (140), послу получения ответа удаляет карточку 142
// 4. закрывает попап 143
function deleteCard(card, id) {
    handleDeleteCard(id)
    .then(() => {
      card.remove();
    })
    .catch((error) => {
      console.log(error);
    })
}

function savingButton(form, isLoading) {
  const button = form.querySelector('.popup__button')
  if (isLoading) {
    button.textContent = 'Сохранение...'
  }
  else button.textContent = 'Сохранить';
}

// validation

enableValidation(config);
