// получаем необходимые элементы страницы
const loader = document.getElementById('loader');
const items = document.getElementById('items');

// ключ хранения данных в localStorage
const STORAGE_KEY = 'currencyRates';

// создает HTML-разметку одной валюты
function createCurrencyItem(currency) {
  return `
    <div class="item">
      <div class="item__code">${currency.CharCode}</div>
      <div class="item__value">${currency.Value}</div>
      <div class="item__currency">руб.</div>
    </div>
  `;
}

// выводит список валют на страницу
function renderCurrencies(currencies) {
  items.innerHTML = '';

  Object.values(currencies).forEach((currency) => {
    items.insertAdjacentHTML(
      'beforeend',
      createCurrencyItem(currency)
    );
  });
}

// показываем сохраненные данные сразу после открытия страницы
const savedCurrencies = localStorage.getItem(STORAGE_KEY);

if (savedCurrencies) {
  renderCurrencies(JSON.parse(savedCurrencies));
}

// создание AJAX-запроса
const xhr = new XMLHttpRequest();

xhr.open(
  'GET',
  'https://students.netoservices.ru/nestjs-backend/slow-get-courses'
);

// обработка успешной загрузки
xhr.addEventListener('load', () => {
  if (xhr.status === 200) {
    const response = JSON.parse(xhr.responseText);
    const currencies = response.response.Valute;

    // показываем свежие данные
    renderCurrencies(currencies);

    // сохраняем их в localStorage
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(currencies)
    );
  }

  // скрытие индикатора загрузки
  loader.classList.remove('loader_active');
});

// даже! при ошибке скрываем прелоадер
xhr.addEventListener('error', () => {
  loader.classList.remove('loader_active');
});

// Отправляем запрос
xhr.send();