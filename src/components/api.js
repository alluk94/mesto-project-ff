// Конфигурация для запроса
const apiConfig = {
  url:'https://nomoreparties.co/v1/wff-cohort-15',
  headers: {
    authorization: 'f41d6bce-6b4b-4f44-8e59-2132d46438b4',
    'content-type':'application/json'
  }
}


const userData = {name:'', about:'', avatar:'', _id:''}

// Описываем fetch-запрос (адрес из конфига, путь из параметров, подставляет из конфига)
function handleFetch(path, method, body) {
  return fetch(`${apiConfig.url}${path}`, {
    method, body:JSON.stringify(body),
    headers:apiConfig.headers
  })
  // обработка ответа
  .then(res => res.json())
  .then((result) => {
    console.log(result);
    return result;
  })
  // обработчик ошибок
  .catch((error) => {
    console.log(error);
  })
}
// достаем информацию о пользователе с сервера
function getUserInfo() {
  return handleFetch('/users/me', 'GET')
}

// достаем информацию о карточках
function getAllCards() {
  return handleFetch('/cards', 'GET')
}

function editProfileInfo(data) {
  return handleFetch('/users/me', 'PATCH', data)
}

function addNewCard(data) {
  return handleFetch('/cards', 'POST', data)
}

function handleDeleteCard(id) {
  return handleFetch(`/cards/${id}`, 'DELETE')
}

function handleLikeCard(id) {
  return handleFetch(`/cards/likes/${id}`, 'PUT')
}

function handleDislikeCard(id) {
  return handleFetch(`/cards/likes/${id}`, 'DELETE')
}

function editProfileAvatar(data) {
  return handleFetch('/users/me/avatar', 'PATCH', data)
}

export {
  getUserInfo, getAllCards, editProfileInfo, addNewCard, handleDeleteCard, handleLikeCard,
  handleDislikeCard, editProfileAvatar, userData
}
