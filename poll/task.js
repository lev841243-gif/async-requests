// получаем элементы страницы
const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

// загружаем опрос с сервера
loadPoll();


// получает опрос и отображает его
function loadPoll() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');

  xhr.addEventListener('load', () => {
    // преобразуем ответ сервера в объект
    const poll = JSON.parse(xhr.responseText);

    // выводим вопрос
    pollTitle.textContent = poll.data.title;

    // очищаем контейнер перед созданием кнопок
    pollAnswers.innerHTML = '';

    // создаем кнопку для каждого варианта ответа
    poll.data.answers.forEach((answer, index) => {
      const button = document.createElement('button');

      button.className = 'poll__answer';
      button.textContent = answer;

      // обрабатываем выбор пользователя
      button.addEventListener('click', () => {
        alert('Спасибо, ваш голос засчитан!');

        sendVote(poll.id, index);
      });

      pollAnswers.appendChild(button);
    });
  });

  xhr.send();
}


// отправляет выбранный ответ на сервер
function sendVote(pollId, answerIndex) {
  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
  xhr.setRequestHeader(
    'Content-Type',
    'application/x-www-form-urlencoded'
  );

  xhr.addEventListener('load', () => {
    // получаем результаты голосования
    const result = JSON.parse(xhr.responseText);

    // отображаем статистику
    showResults(result.stat);
  });

  xhr.send(`vote=${pollId}&answer=${answerIndex}`);
}


// выводит результаты голосования
function showResults(statistics) {
  // вычисляем общее количество голосов
  const totalVotes = statistics.reduce((sum, item) => {
    return sum + item.votes;
  }, 0);

  // очищаем контейнер
  pollAnswers.innerHTML = '';

  // выводим процент голосов для каждого ответа
  statistics.forEach((item) => {
    const percent = ((item.votes / totalVotes) * 100).toFixed(2);

    const result = document.createElement('div');
    result.textContent = `${item.answer}: ${percent}%`;

    pollAnswers.appendChild(result);
  });
}