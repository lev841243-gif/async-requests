// получаем необходимые элементы со страницы
const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

// создаем AJAX-запрос
const xhr = new XMLHttpRequest();

// настраиваем GET-запрос
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');

// после успешного получения данных
xhr.addEventListener('load', () => {
  // преобразуем JSON-ответ в объект
  const response = JSON.parse(xhr.responseText);

  // выводим вопрос опроса
  pollTitle.textContent = response.data.title;

  // очищаем контейнер с ответами
  pollAnswers.innerHTML = '';

  // создаем кнопку для каждого варианта ответа
  response.data.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.className = 'poll__answer';
    button.textContent = answer;

    // при нажатии выводим сообщение
    button.addEventListener('click', () => {
      alert('Спасибо, ваш голос засчитан!');
    });

    // добавляем кнопку на страницу
    pollAnswers.appendChild(button);
  });
});

// отправляем запрос
xhr.send();