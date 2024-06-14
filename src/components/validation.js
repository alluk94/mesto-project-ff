// включение валидации вызовом enableValidation
// все настройки передаются при вызове

export function enableValidation(config){
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach(formElement => {
    formElement.addEventListener('input',()=>{
      toggleButton(formElement, config)
    })
    addInputListeners(formElement, config)
    toggleButton(formElement, config)
  });
};

export function toggleButton(formElement, config) {
  const button = formElement.querySelector(config.submitButtonSelector);
  const isValid = formElement.checkValidity()
  button.disabled = !isValid;
  button.classList.toggle(config.inactiveButtonClass, !isValid);
}

function addInputListeners(formElement, config) {
  const inputs = formElement.querySelectorAll(config.inputSelector);
  inputs.forEach(inputElement => {
    inputElement.addEventListener('input', ()=>{
      checkInputValidation(inputElement, config)
    })
  })
}

function checkInputValidation(inputElement, config) {
const inputId = inputElement.id;
const errorSpan = document.querySelector(`#${inputId}-error`);
if (inputElement.validity.patternMismatch) {
  // встроенный метод setCustomValidity принимает на вход строку
  // и заменяет ею стандартное сообщение об ошибке
  inputElement.classList.add(config.inputErrorClass)
inputElement.setCustomValidity(inputElement.dataset.error);
} else {
  // если передать пустую строку, то будут доступны
  // стандартные браузерные сообщения
  inputElement.classList.remove(config.inputErrorClass)
inputElement.setCustomValidity("");
}
if(inputElement.validity.valid) {
  inputElement.classList.remove(config.inputErrorClass)
  errorSpan.textContent = '';
}
else {
  inputElement.classList.add(config.inputErrorClass)
  errorSpan.textContent = inputElement.validationMessage;
}
}

export function clearValidation(formElement, config) {
  const inputs = formElement.querySelectorAll(config.inputSelector);
  toggleButton(formElement, config);
  inputs.forEach(inputElement => {
    checkInputValidation(inputElement, config);
  })
}
