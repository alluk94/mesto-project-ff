// @todo: Темплейт карточки

const templateCard = document.querySelector('#card-template').content.querySelector('.card') // объявляем тимплейт по айдишнику с содержимым

// @todo: DOM узлы

const listContainer = document.querySelector('.places__list'); // объявляем список по классу

// @todo: Функция создания карточки   

function createCard(card, cardDelete) { // объявляем функцию с двумя аргументами
    const newCard = templateCard.cloneNode(true); // объявляем элемент списка (карточку) и клонируем его вместе с содержимым
    const deleteButton = newCard.querySelector('.card__delete-button'); // объявляем кнопку удаления карточки
    
    deleteButton.addEventListener('click', function(){ // добавляем обработчик событий по клику
        cardDelete(newCard) // удаляет карточку с содержимым
    })
    const cardImage = newCard.querySelector('.card__image'); // объявляем изображение карточки
    cardImage.src = card.link // назначаем ссылку из массива
    cardImage.alt = card.name // назначаем наименование карточки из массива
    newCard.querySelector('.card__title').textContent = card.name // объявляем заголовок карточки из массива
    
    return newCard; // возвращаем результат функции (карточку)
    }

// @todo: Функция удаления карточки

function cardDelete(card) {
    card.remove()
}

// @todo: Вывести карточки на страницу

for(let i = 0; i < initialCards.length; i++) { // начало цикла, в котором переменная увеличивапется на 1
    const newCard = createCard(initialCards[i], cardDelete) //  добавляем новую карточку с двумя аргументами 
    listContainer.prepend(newCard) // добавляем карточку в начало списка карточек
}